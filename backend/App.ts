import * as express from "express";
import * as bodyParser from "body-parser";
import { UsersModel } from "./model/UsersModel";
import { RestaurantModel } from "./model/RestaurantModel";
import { RestaurantManagerModel } from "./model/RestaurantManagerModel";
import { RestaurantOwnerModel } from "./model/RestaurantOwnerModel";
import { ItemModel } from "./model/ItemModel";
import { MenuModel } from "./model/MenuModel";
import * as cors from "cors";

import * as crypto from "crypto";

import GooglePassport from "./GooglePassport";
import * as passport from "passport";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public expressApp: express.Application;
  public Users: UsersModel;
  public RestaurantManagers: RestaurantManagerModel;
  public RestaurantOwners: RestaurantOwnerModel;
  public Restaurants: RestaurantModel;
  public Items: ItemModel;
  public Menus: MenuModel;
  public GooglePassport: GooglePassport;

  //Run configuration methods on the Express instance.
  constructor() {
    this.GooglePassport = new GooglePassport();
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Users = new UsersModel();
    this.Restaurants = new RestaurantModel();
    this.RestaurantManagers = new RestaurantManagerModel();
    this.RestaurantOwners = new RestaurantOwnerModel();
    this.Items = new ItemModel();
    this.Menus = new MenuModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(cors());
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    this.expressApp.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });
    this.expressApp.use(passport.initialize());
    this.expressApp.use(passport.session());
  }

  private validateAuth(req, res, next) {
    if(req.isAuthenticated()) {
      console.log("[App] User is authenticated"); 
      return next();
    }
    console.log("[App] User is not authenticated");
    res.redirect('/');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();

    router.get("/auth/google/callback", passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
      console.log("[App] Google User Authentication Success, redirecting to dashboard");
      res.redirect('/#/dashboard');
    });

    router.get("/api/health", (req, res, next) => {
      console.log("[App] Health Check");
      res.json({ healthy: true }).status(200);
    });

    router.get('/auth/google')

    /**
     * Get all restaurant managers for a restaurant owner
     * @param restaurantOwnerID - restaurant owner ID for which to get all restaurant managers
     * @return json object of all restaurant managers for the restaurant owner
     */
    router.get(
      "/api/restaurantmanagers/:restaurantOwnerID",
      async (req, res) => {
        let restaurantOwnerID = req.params.restaurantOwnerID;
        console.log(
          "[App] Query All Restaurant Managers for restaurant owner: " +
            restaurantOwnerID
        );
        const result =
          await this.RestaurantManagers.retrieveAllRestaurantManagers(
            res,
            restaurantOwnerID
          );
        res.json(result);
      }
    );

    /**
     * Create a new restaurant manager
     * @param req
     * - restaurantOwnerID - restaurant owner ID for which to create a new restaurant manager
     * - password - password for the new restaurant manager
     * - connectStatus - connection status for the new restaurant manager
     * - managerName - name of the new restaurant manager
     * - restaurantID - restaurant ID to which the new restaurant manager belongs
     */
    router.post("/api/restaurantmanagers/create-manager", (req, res) => {
      //TODO: create in route is redundant
      //check if restaurantOwnerID passed is empty
      if (req.body.restaurantOwnerID === "") {
        console.log("restaurantOwnerID is invalid!");
        res.send("restaurantOwnerID is invalid!");
        return;
      }

      //params from request body
      let createManager: object = {
        userID: crypto.randomUUID(),
        password: req.body.password, // TODO: salt & hash  password this shouldn't be here tbh
        connectStatus: true,
        //IRestaurantManagerModel
        managerName: req.body.managerName,
        restaurantOwnerID: req.body.restaurantOwnerID,
        restuarantID: req.body.restaurantID,
      };

      console.log(
        "[App] Creating new restaurant manager with:" +
          JSON.stringify(createManager)
      );
      this.RestaurantManagers.createRestaurantManager(res, createManager);
    });

    /**
     * update restaurant by ID
     * @param restaurantID - restaurant ID for which to get a specific restaurant
     * @param managerID - restaurant ID for which to get a specific restaurant
     * @param menuID - restaurant ID for which to get a specific restaurant
     */

    router.post("/api/restaurantmanagers/update-manager", async (req, res) => {
      console.log("Update manager with ManagerId: " + req.body.UserID);
      let filter: object = {
        userID: req.body.userID,
      };

      let update: object = {
        managerName: req.body.managerName,
        restaurantOwnerID: req.body.restaurantOwnerID,
        restaurantID: req.body.restaurantID,
      };
      console.log(filter);
      console.log(update);

      const result = await this.RestaurantManagers.updateManagerByID(
        filter,
        update
      );
      res.json(result);
    });

    /* Restaurant Routes */

    /**
     * Query all restaurants by OwnerID
     * @param restaurantOwnerID - restaurant owner ID to which query all restaurants
     */
    router.get("/api/restaurant/all/:restaurantOwnerID", async (req, res) => {
      let restaurantOwnerID = req.params.restaurantOwnerID;
      console.log("Query All Restaurants");
      this.Restaurants.retrieveAllRestaurants(res, restaurantOwnerID);
    });

    /**
     * Create a new restaurant
     * @param req
     * - restaurantName - name of the new restaurant
     * - description - description of the new restaurant
     * - tag - tag of the new restaurant
     * - restaurantImage - image url of the new restaurant
     */
    router.post("/api/restaurant/", async (req, res) => {
      //params from request body
      let createRestaurant: object = {
        restaurantID: crypto.randomUUID(),
        restaurantName: req.body.restaurantName,
        description: req.body.description,
        tag: req.body.tag,
        restaurantImage: req.body.restaurantImage,
        restaurantOwnerID: req.body.restaurantOwnerID,
      };

      console.log(
        "[App] Creating new restaurant with:" + JSON.stringify(createRestaurant)
      );
      const result = await this.Restaurants.createRestaurant(
        res,
        createRestaurant
      );
      res.json(result);
    });

    /**
     * Get a specific restaurant by ID
     * @param restaurantID - restaurant ID for which to get a specific restaurant
     */

    router.get("/api/restaurant/:restaurantID", async (req, res) => {
      console.log(
        "Query Restaurant with restaurantId: " + req.params.restaurantID
      );
      let filter: object = {
        restaurantID: req.params.restaurantID,
      };
      const result = await this.Restaurants.getRestaurantByID(filter);
      res.json(result);
    });
    /**
     * update restaurant by ID
     * @param restaurantID - restaurant ID for which to get a specific restaurant
     * @param managerID - restaurant ID for which to get a specific restaurant
     * @param menuID - restaurant ID for which to get a specific restaurant
     */

    router.post("/api/updateRestaurant/", async (req, res) => {
      console.log(
        "Update Restaurant with restaurantId: " + req.body.restaurantID
      );
      let filter: object = {
        restaurantID: req.body.restaurantID,
      };

      let update: object = {
        restaurantName: req.body.restaurantName,
        managerID: req.body.managerID,
        menusID: req.body.menusID,
        description: req.body.description,
        restaurantImage: req.body.restaurantImage,
        tag: req.body.tag,
      };
      console.log(
        "update restaurants: " + update["tag"] + " " + update["restaurantImage"]
      );
      const result = await this.Restaurants.updateRestaurantByID(
        filter,
        update
      );
      res.json(result);
    });

    /* Item Routes */

    /* GET Routes */

    /**
     * Get all items
     * @returns - JSON obj of all items as a response
     */
    router.get("/api/item/all", (req, res) => {
      console.log("Query All items");
      this.Items.retrieveAllItems(res);
    });

    /**
     * Get a specific item by ID
     * @param itemID
     *  - The ID of the item to retrieve
     * @returns
     * - JSON obj of the item with the specified ID as a response
     */
    router.get("/api/item/:itemID", async (req, res) => {
      console.log("Query item with itemID");
      let filter: object = {
        itemID: req.params.itemID,
      };
      const item = await this.Items.getItem(filter);
      if (JSON.stringify(item) === "{}") {
        res.status(400).json({ message: "Item is not found" });
        return;
      }
      res.json(item);
    });

    /* POST Routes */

    /**
     * Create a new item
     * @param req
     *  - itemName: string - name of the item
     * - itemDescription: string - description of the item
     * - itemPrice: number - price of the item
     * - itemImg: string - URL of the image of the item
     * - restaurantID: string - ID of the restaurant to which the item is associated
     * - menusID: string - ID of the menu to which the item is associated
     */
    router.post("/api/item/create", (req, res) => {
      console.log("Insert item into items collection");
      let createItem: object = {
        ItemID: crypto.randomUUID(),
        itemName: req.body.itemName,
        itemDecription: req.body.itemDecription,
        itemPrice: req.body.itemPrice,
        itemImg: req.body.itemImg,
        restaurantID: req.body.restaurantID,
        menusID: req.body.menusID,
      };
      console.log(createItem);
      this.Items.createItem(res, createItem);
    });

    /* DELETE Routes */
    router.delete("/api/item/delete/:itemID", async (req, res) => {
      console.log("[App] Delete item with itemID: " + req.params.itemID);
      let filter: object = {
        itemID: req.params.itemID,
      };
      const deleteItemRes = await this.Items.deleteItem(filter);
      if (deleteItemRes === null) res.json({ message: "Item is not found" });
      else res.json(deleteItemRes);
    });






    /**
     * delete a restaurant
     * @param req
     * - restaurantID: string - ID of restaurant
     */

    router.delete("/api/restaurant/delete/:restaurantID", async (req, res) => {
      console.log("[App] Delete restaurant with restaurantID: " + req.params.restaurantID);
      let filter: object = {
        restaurantID: req.params.restaurantID,
      }

      const deleteRestaurantRes = await this.Restaurants.deleteRestaurant(filter);
      if(deleteRestaurantRes === null) {
        res.json({message: "Restaurant is not found"});
      } else {
        res.json(deleteRestaurantRes);
      }

    });






    /**
     * Menu Routes
     */

    /* GET Routes */

    /**
     * Get all menus
     * @param req
     * - restaurantId: string - ID of the restaurant for which to retrieve all menus
     * @returns - JSON obj of all menus as a response
     */
    router.get("/api/menus/:restaurantID", async (req, res) => {
      // Get the RestaurantId URL parameters
      let restaurantID: string = req.params.restaurantID;

      console.log("[App] Query all menus for: " + restaurantID);

      // Query the database for all menus
      const result = await this.Menus.retrieveAllMenus(res, {
        restaurantID: restaurantID,
      });
      res.json(result);
    });

    /**
     * Get all menu sections for a specific menu for a specific restaurant
     * @param restaurantId: string - ID of the restaurant for which to retrieve all menus
     * @param menuId: string - ID of the menu for which to retrieve all menu sections
     */
    router.get("/api/menus/:restaurantID/:menuID", (req, res) => {
      // Get the RestaurantId, RestaurantOwnerId, and menuId from URL parameters
      let restaurantID: string = req.params.restaurantID;
      let menuID: string = req.params.menuID;

      console.log(
        "Query all menu sections for: " +
          menuID +
          " for restaurant: " +
          restaurantID
      );

      // Query the database for all menus
      this.Menus.retrieveMenuSections(res, {
        restaurantID: restaurantID,
        menuID: menuID,
      });
    });

    // POST Routes

    /**
     * Create a new menu
     * req body
     *    restaurantOwnerId: string,
     *    restaurantId: string,
     *    menuName: string
     *    menuSections: string[]
     *    menuDescription: string
     *    menuStartTime: Date
     *    menuEndTime: Date
     */
    router.post("/api/menus/create", async (req, res) => {
      // Pre check: Check if the restaurant exists
      // Get RestaurantID
      console.log("[App] Trying to create a new menu...");
      let restaurantID: string = req.body.restaurantID;
      try {
        const checkRestaurant = await this.Restaurants.getRestaurantByID({
          restaurantID: restaurantID,
        });
        console.log(
          "[App] Restaurant found: " + checkRestaurant["restaurantName"]
        );

        if (JSON.stringify(checkRestaurant) == "{}") {
          res.status(400).json({ message: "Restaurant is not found" });
          console.error("\tRestaurant is not found");
          return;
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error " });
      }
      // Get all the parameters from the request body
      let createMenu: object = {
        menuID: crypto.randomUUID(),
        restaurantID: req.body.restaurantID,
        menuName: req.body.menuName,
        menuDescription: req.body.menuDescription,
        menuSections: req.body.menuSections,
        menuStartTime: req.body.menuStartTime,
        menuEndTime: req.body.menuEndTime,
      };
      console.log("[App] Creating new menu with:" + JSON.stringify(createMenu));
      this.Menus.createMenu(res, createMenu);
    });
    /**
     * Add a new section to an existing menu
     * @param req
     * - restaurantId: string - restaurantID to which the menu belongs
     * - menuId: string - menuID to which the new section is to be added
     * - sectionName: string - name of the section to be added
     * @param res json obejct of the new menu section
     */
    router.post("/api/menus/add/section", (req, res) => {
      // Get the RestaurantId, menuId, sectionName from req body
      let restaurantID: string = req.body.restaurantID;
      let menuID: string = req.body.menuID;
      let sectionName: string = req.body.sectionName;

      console.log(
        "Adding " +
          sectionName +
          " : " +
          menuID +
          " for restaurant: " +
          restaurantID
      );

      // Query the database to add a section to the menu
      this.Menus.addMenuSection(
        res,
        { restaurantID: restaurantID, menuID: menuID },
        sectionName
      );
    });

    /**
     * Add an existing item to an existing section in an existing menu
     * @param req
     *  - restaurantId: string - restaurantID to which the menu belongs
     *  - menuId: string - menuID to which the section belongs
     *  - menuSection: string - menuSection to which the item  should be added to
     *  - itemId: string - itemID of the item to be added
     */
    router.post("/api/items/add/item", async (req, res) => {
      // Get the RestaurantId, menuId, sectionName, itemId from req body
      let restaurantID: string = req.body.restaurantID;
      let menuID: string = req.body.menuID;
      let sectionName: string = req.body.sectionName;
      let itemID: string = req.body.itemID;

      try {
        // Pre check: check if the item exists in the database
        const checkItem = await this.Items.getItem({ itemID: itemID });
        // check for empty JSON
        if (JSON.stringify(checkItem) === "{}") {
          res.status(400).json({ message: "Item is not found" });
          return;
        }
        // Check if the item already exists in the menu section
        const existingItem = await this.Menus.checkItemInSection(
          { restaurantID: restaurantID, menuID: menuID },
          itemID
        ).then((result) => {
          return result[0]["count"];
        });
        console.log("[APP | DEBUG] Existing item: " + existingItem);
        if (existingItem) {
          res
            .status(400)
            .json({ message: "Item already exists in the section" });
          return;
        }

        // Add the item to the menu section
        this.Menus.addMenuItem(res, {
          restaurantID: restaurantID,
          menuID: menuID,
          sectionName: sectionName,
          itemID: itemID,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error " });
      }
    });
    /**
     * update menu for a restaurant by restaurantID
     * @param restaurantID - restaurant ID for which to get a specific restaurant
     * @param managerID - restaurant ID for which to get a specific restaurant
     * @param ID - restaurant ID for which to get a specific restaurant
     */

    router.post("/api/updateMenus/", async (req, res) => {
      console.log(
        "Update Restaurant with restaurantId: " + req.body.restaurantID
      );
      let filter: object = {
        menuID: req.body.menuID,
        restaurantID: req.body.restaurantID,
      };

      let update: object = {
        menuName: req.body.menuName,
        menuItems: req.body.menuItems,
        menuSections: req.body.menuSections,
        menuDescription: req.body.menuDescription,
        menuStartTime: req.body.menuStartTime,
        menuEndTime: req.body.menuEndTime,
        public: req.body.public,
      };
      console.log("update menu menuID: " + update["menuID"]);
      const result = await this.Menus.updateMenuByID(filter, update);
      res.json(result);
    });

    // PATCH Routes

    /**
     * Update the menu time
     * @param req
     * - restaurantId: string - restaurantID to which the menu belongs
     * - menuId: string - menuID whose time is to be updated
     * - startTime: Date - new start time of the menu
     * - endTime: Date - new end time of the menu
     * @param res json obejct of the updated menu
     */
    router.patch("/api/menus/update/menu-time", (req, res) => {
      // Get the new start and end time from req body
      let startTime: string = req.body.startTime;
      let endTime: string = req.body.endTime;
      // Get the RestaurantId and menuId from req body
      let filter: object = {
        restaurantID: req.body.restaurantID,
        menuID: req.body.menuID,
      };

      console.log("[App] Updating menu time");

      // Query the database to add a section to the menu
      this.Menus.updateMenuTime(res, filter, startTime, endTime);
    });

    this.expressApp.use("/", router);
    this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
    this.expressApp.use("/images", express.static(__dirname + "/img"));
    // this.expressApp.use("/", express.static(__dirname + "/pages"));
    this.expressApp.use("/", express.static(__dirname + "/angularDist"));
  }
}

export { App };
// import * as express from "express";
// import * as bodyParser from "body-parser";
// import * as cors from "cors";
// import {UsersModel} from "./model/UsersModel";
// import {RestaurantModel} from "./model/RestaurantModel";
// import {RestaurantManagerModel} from "./model/RestaurantManagerModel";
// import {RestaurantOwnerModel} from "./model/RestaurantOwnerModel";
// import {ItemModel} from "./model/ItemModel";
// import {MenuModel} from "./model/MenuModel";

// import * as crypto from "crypto";

// // Creates and configures an ExpressJS web server.
// class App {
//     // ref to Express instance
//     public expressApp: express.Application;
//     public Users: UsersModel;
//     public RestaurantManagers: RestaurantManagerModel;
//     public RestaurantOwners: RestaurantOwnerModel;
//     public Restaurants: RestaurantModel;
//     public Items: ItemModel;
//     public Menus: MenuModel;

//     //Run configuration methods on the Express instance.
//     constructor() {
//         this.expressApp = express();
//         this.middleware();
//         this.routes();
//         this.Users = new UsersModel();
//         this.Restaurants = new RestaurantModel();
//         this.RestaurantManagers = new RestaurantManagerModel();
//         this.RestaurantOwners = new RestaurantOwnerModel();
//         this.Items = new ItemModel();
//         this.Menus = new MenuModel();
//     }

//     // Configure Express middleware.
//     private middleware(): void {
//         this.expressApp.use(cors());
//         this.expressApp.use(bodyParser.json());
//         this.expressApp.use(bodyParser.urlencoded({extended: false}));
//         this.expressApp.use((req, res, next) => {
//             res.header('Access-Control-Allow-Origin', '*');
//             next();
//         });
//     }

//     // Configure API endpoints.
//     private routes(): void {
//         let router = express.Router();

//         router.get("/api/health", (req, res) => {
//             console.log("[App] Health Check");
//             res.json({healthy: true}).status(200);
//         });

//         /**
//          * Get all restaurant managers for a restaurant owner
//          * @param restaurantOwnerID - restaurant owner ID for which to get all restaurant managers
//          * @return json object of all restaurant managers for the restaurant owner
//          */
//         router.get(
//             "/api/restaurantmanagers/:restaurantOwnerID",
//             async (req, res) => {
//                 let restaurantOwnerID = req.params.restaurantOwnerID;
//                 console.log("[App] Query All Restaurant Managers for restaurant owner: " + restaurantOwnerID);
//                 const result = await this.RestaurantManagers.retrieveAllRestaurantManagers(
//                     res,
//                     restaurantOwnerID
//                 );
//                 res.json(result);
//             }
//         );

//         /**
//          * Create a new restaurant manager
//          * @param req
//          * - restaurantOwnerID - restaurant owner ID for which to create a new restaurant manager
//          * - password - password for the new restaurant manager
//          * - connectStatus - connection status for the new restaurant manager
//          * - managerName - name of the new restaurant manager
//          * - restaurantID - restaurant ID to which the new restaurant manager belongs
//          */
//         router.post("/api/restaurantmanagers/create-manager", (req, res) => { //TODO: create in route is redundant
//             //check if restaurantOwnerID passed is empty
//             if (req.body.restaurantOwnerID === "") {
//                 console.log("restaurantOwnerID is invalid!");
//                 res.send("restaurantOwnerID is invalid!");
//                 return;
//             }

//             //params from request body
//             let createManager: object = {
//                 userID: crypto.randomUUID(),
//                 password: req.body.password, // TODO: salt & hash  password this shouldn't be here tbh
//                 connectStatus: true,
//                 //IRestaurantManagerModel
//                 managerName: req.body.managerName,
//                 restaurantOwnerID: req.body.restaurantOwnerID,
//                 restuarantID: req.body.restaurantID,
//             };

//             console.log(
//                 "[App] Creating new restaurant manager with:" +
//                 JSON.stringify(createManager)
//             );
//             this.RestaurantManagers.createRestaurantManager(res, createManager);
//         });

//         /* Restaurant Routes */

//         /**
//          * Query all restaurants by OwnerID
//          * @param restaurantOwnerID - restaurant owner ID to which query all restaurants
//          */
//         router.get("/api/restaurant/all/:restaurantOwnerID", async (req, res) => {
//             let restaurantOwnerID = req.params.restaurantOwnerID;
//             console.log("Query All Restaurants");
//             await this.Restaurants.retrieveAllRestaurants(
//                 res,
//                 restaurantOwnerID
//             );
//         });

//         /**
//          * Create a new restaurant
//          * @param req
//          * - restaurantName - name of the new restaurant
//          * - description - description of the new restaurant
//          * - tag - tag of the new restaurant
//          * - restaurantImage - image url of the new restaurant
//          */
//         router.post("/api/restaurant/", async (req, res) => {
//             //params from request body
//             let createRestaurant: object = {
//                 restaurantID: crypto.randomUUID(),
//                 restaurantName: req.body.restaurantName,
//                 description: req.body.description,
//                 tag: req.body.tag,
//                 restaurantImage: req.body.restaurantImage,
//                 restaurantOwnerID: req.body.restaurantOwnerID,
//             };

//             console.log(
//                 "[App] Creating new restaurant with:" + JSON.stringify(createRestaurant)
//             );
//             const result = await this.Restaurants.createRestaurant(res, createRestaurant);
//             res.json(result);
//         });

//         /**
//          * Get a specific restaurant by ID
//          * @param restaurantID - restaurant ID for which to get a specific restaurant
//          */

//         router.get("/api/restaurant/:restaurantID", async (req, res) => {
//             console.log(
//                 "Query Restaurant with restaurantId: " + req.params.restaurantID
//             );
//             let filter: object = {
//                 restaurantID: req.params.restaurantID,
//             };
//             const result = await this.Restaurants.getRestaurantByID(filter);
//             res.json(result);
//         });

//         /* Item Routes */

//         /* GET Routes */

//         /**
//          * Get all items
//          * @returns - JSON obj of all items as a response
//          */
//         router.get("/api/item/all", (req, res) => {
//             console.log("Query All items");
//             this.Items.retrieveAllItems(res);
//         });

//         /**
//          * Get a specific item by ID
//          * @param itemID
//          *  - The ID of the item to retrieve
//          * @returns
//          * - JSON obj of the item with the specified ID as a response
//          */
//         router.get("/api/item/:itemID", async (req, res) => {
//             console.log("Query item with itemID");
//             let filter: object = {
//                 itemID: req.params.itemID,
//             };
//             const item = await this.Items.getItem(filter);
//             if (JSON.stringify(item) === "{}") {
//                 res.status(400).json({message: "Item is not found"});
//                 return;
//             }
//             res.json(item);
//         });

//         /* POST Routes */

//         /**
//          * Create a new item
//          * @param req
//          *  - itemName: string - name of the item
//          * - itemDescription: string - description of the item
//          * - itemPrice: number - price of the item
//          * - itemImg: string - URL of the image of the item
//          * - restaurantID: string - ID of the restaurant to which the item is associated
//          * - menusID: string - ID of the menu to which the item is associated
//          */
//         router.post("/api/item/create", (req, res) => {
//             console.log("Insert item into items collection");
//             let createItem: object = {
//                 ItemID: crypto.randomUUID(),
//                 itemName: req.body.itemName,
//                 itemDecription: req.body.itemDecription,
//                 itemPrice: req.body.itemPrice,
//                 itemImg: req.body.itemImg,
//                 restaurantID: req.body.restaurantID,
//                 menusID: req.body.menusID,
//             };
//             console.log(createItem);
//             this.Items.createItem(res, createItem);
//         });

//         /* DELETE Routes */
//         router.delete("/api/item/delete/:itemID", async (req, res) => {
//             console.log("[App] Delete item with itemID: " + req.params.itemID);
//             let filter: object = {
//                 itemID: req.params.itemID,
//             };
//             const deleteItemRes = await this.Items.deleteItem(filter);
//             if (deleteItemRes === null)
//                 res.json({message: "Item is not found"});
//             else res.json(deleteItemRes);
//         });

//         /**
//          * Menu Routes
//          */

//         /* GET Routes */

//         /**
//          * Get all menus
//          * @param req
//          * - restaurantId: string - ID of the restaurant for which to retrieve all menus
//          * @returns - JSON obj of all menus as a response
//          */
//         router.get("/api/menus/:restaurantID", async (req, res) => {
//             // Get the RestaurantId URL parameters
//             let restaurantID: string = req.params.restaurantID;

//             console.log("[App] Query all menus for: " + restaurantID);

//             // Query the database for all menus
//             const result = await this.Menus.retrieveAllMenus(res, {
//                 restaurantID: restaurantID,
//             });
//             res.json(result);
//         });

//         /**
//          * Get all menu sections for a specific menu for a specific restaurant
//          * @param restaurantId: string - ID of the restaurant for which to retrieve all menus
//          * @param menuId: string - ID of the menu for which to retrieve all menu sections
//          */
//         router.get("/api/menus/:restaurantID/:menuID", (req, res) => {
//             // Get the RestaurantId, RestaurantOwnerId, and menuId from URL parameters
//             let restaurantID: string = req.params.restaurantID;
//             let menuID: string = req.params.menuID;

//             console.log(
//                 "Query all menu sections for: " +
//                 menuID +
//                 " for restaurant: " +
//                 restaurantID
//             );

//             // Query the database for all menus
//             this.Menus.retrieveMenuSections(res, {
//                 restaurantID: restaurantID,
//                 menuID: menuID,
//             });
//         });

//         // POST Routes

//         /**
//          * Create a new menu
//          * req body
//          *    restaurantOwnerId: string,
//          *    restaurantId: string,
//          *    menuName: string
//          *    menuSections: string[]
//          *    menuDescription: string
//          *    menuStartTime: Date
//          *    menuEndTime: Date
//          */
//         router.post("/api/menus/create", async (req, res) => {
//             // Pre-check: Check if the restaurant exists
//             // Get RestaurantID
//             console.log("[App] Trying to create a new menu...");
//             let restaurantID: string = req.body.restaurantID;
//             try {
//                 const checkRestaurant = await this.Restaurants.getRestaurantByID({
//                     restaurantID: restaurantID,
//                 });
//                 console.log(
//                     "[App] Restaurant found: " + checkRestaurant["restaurantName"]
//                 );

//                 if (JSON.stringify(checkRestaurant) == "{}") {
//                     res.status(400).json({message: "Restaurant is not found"});
//                     console.error("\tRestaurant is not found");
//                     return;
//                 }
//             } catch (error) {
//                 console.error(error);
//                 res.status(500).json({message: "Internal server error "});
//             }
//             // Get all the parameters from the request body
//             let createMenu: object = {
//                 menuID: crypto.randomUUID(),
//                 restaurantID: req.body.restaurantID,
//                 menuName: req.body.menuName,
//                 menuDescription: req.body.menuDescription,
//                 menuSections: req.body.menuSections,
//                 menuStartTime: req.body.menuStartTime,
//                 menuEndTime: req.body.menuEndTime,
//             };
//             console.log("[App] Creating new menu with:" + JSON.stringify(createMenu));
//             await this.Menus.createMenu(res, createMenu);
//         });
//         /**
//          * Add a new section to an existing menu
//          * @param req
//          * - restaurantId: string - restaurantID to which the menu belongs
//          * - menuId: string - menuID to which the new section is to be added
//          * - sectionName: string - name of the section to be added
//          * @param res json obejct of the new menu section
//          */
//         router.post('/api/menus/add/section', (req, res) => {
//             // Get the RestaurantId, menuId, sectionName from req body
//             let restaurantID: string = req.body.restaurantID;
//             let menuID: string = req.body.menuID;
//             let sectionName: string = req.body.sectionName;

//             console.log("Adding " + sectionName + " : " + menuID + " for restaurant: " + restaurantID);

//             // Query the database to add a section to the menu
//             this.Menus.addMenuSection(res, {restaurantID: restaurantID, menuID: menuID}, sectionName);
//         });

//         /**
//          * Add an existing item to an existing section in an existing menu
//          * @param req
//          *  - restaurantId: string - restaurantID to which the menu belongs
//          *  - menuId: string - menuID to which the section belongs
//          *  - menuSection: string - menuSection to which the item  should be added to
//          *  - itemId: string - itemID of the item to be added
//          */
//         router.post("/api/items/add/item", async (req, res) => {
//             // Get the RestaurantId, menuId, sectionName, itemId from req body
//             let restaurantID: string = req.body.restaurantID;
//             let menuID: string = req.body.menuID;
//             let sectionName: string = req.body.sectionName;
//             let itemID: string = req.body.itemID;

//             try {
//                 // Pre check: check if the item exists in the database
//                 const checkItem = await this.Items.getItem({itemID: itemID});
//                 // check for empty JSON
//                 if (JSON.stringify(checkItem) === "{}") {
//                     res.status(400).json({message: "Item is not found"});
//                     return;
//                 }
//                 // Check if the item already exists in the menu section
//                 const existingItem = await this.Menus.checkItemInSection(
//                     {restaurantID: restaurantID, menuID: menuID},
//                     itemID
//                 ).then((result) => {
//                     return result[0]["count"];
//                 });
//                 console.log("[APP | DEBUG] Existing item: " + existingItem);
//                 if (existingItem) {
//                     res
//                         .status(400)
//                         .json({message: "Item already exists in the section"});
//                     return;
//                 }

//                 // Add the item to the menu section
//                 this.Menus.addMenuItem(res, {
//                     restaurantID: restaurantID,
//                     menuID: menuID,
//                     sectionName: sectionName,
//                     itemID: itemID,
//                 });
//             } catch (error) {
//                 console.error(error);
//                 res.status(500).json({message: "Internal server error "});
//             }
//         });

//         // PATCH Routes

//         /**
//          * Update the menu time
//          * @param req
//          * - restaurantId: string - restaurantID to which the menu belongs
//          * - menuId: string - menuID whose time is to be updated
//          * - startTime: Date - new start time of the menu
//          * - endTime: Date - new end time of the menu
//          * @param res json obejct of the updated menu
//          */
//         router.patch("/api/menus/update/menu-time", (req, res) => {
//             // Get the new start and end time from req body
//             let startTime: string = req.body.startTime;
//             let endTime: string = req.body.endTime;
//             // Get the RestaurantId and menuId from req body
//             let filter: object = {
//                 restaurantID: req.body.restaurantID,
//                 menuID: req.body.menuID,
//             };

//             console.log("[App] Updating menu time");

//             // Query the database to add a section to the menu
//             this.Menus.updateMenuTime(res, filter, startTime, endTime);
//         });

//         this.expressApp.use("/", router);
//         this.expressApp.use("/app/json/", express.static(__dirname + "/app/json"));
//         this.expressApp.use("/images", express.static(__dirname + "/img"));
//         this.expressApp.use("/", express.static(__dirname + "/pages"));
//     }
// }

// export {App};

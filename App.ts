import * as express from 'express';
import * as bodyParser from 'body-parser';
// import {ListModel} from './model/ListModel';
// import { TaskModel } from './model/TaskModel';
import { UsersModel } from './model/UsersModel';
import { RestaurantModel } from './model/RestaurantModel';
import { RestaurantManagerModel } from './model/RestaurantManagerModel';
import { RestaurantOwnerModel } from './model/RestaurantOwnerModel';
import { ItemModel } from './model/ItemModel';
import { MenuModel } from './model/MenuModel';
// Helper functions
import { parseTime, formatTime } from './helpers/parseTime';
import * as crypto from 'crypto';

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

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Users = new UsersModel();
    this.Restaurants=new RestaurantModel();
    this.RestaurantManagers = new RestaurantManagerModel();
    this.RestaurantOwners = new RestaurantOwnerModel();
    this.Items = new ItemModel();
    this.Menus = new MenuModel();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get('api/health', (req, res, next) => {
      res.json({ "healthy": true }).status(200);
    });
    
    /**
     * Get all restaurant managers for a restaurant owner
     * @param restaurantOwnerID - restaurant owner ID for which to get all restaurant managers
     * @return json object of all restaurant managers for the restaurant owner
     */
    router.get('/app/restaurantmanagers/:restaurantOwnerID', (req, res) => {
      let restaurantOwnerID = req.params.restaurantOwnerID;
      console.log('Query All Restaurant Managers');
      this.RestaurantManagers.retrieveAllRestaurantManagers(res, restaurantOwnerID);
    });

    /**
     * Create a new restaurant manager
     * @param req
     * - restaurantOwnerID - restaurant owner ID for which to create a new restaurant manager
     * - password - password for the new restaurant manager
     * - connectStatus - connection status for the new restaurant manager
     * - managerName - name of the new restaurant manager
     * - restaurantID - restaurant ID to which the new restaurant manager belongs
     */
    router.post('/app/restaurantmanagers/create-manager', (req, res) => {
      //check if restaurantOwnerID passed is empty
      if (req.body.restaurantOwnerID === "") {
        console.log("restaurantOwnerID is invalid!");
        res.send("restaurantOwnerID is invalid!");
        return;
      }
      
      
      //params from request body
      let createManager: object = {
        userID: crypto.randomUUID(),
        password: req.body.password,
        connectStatus: true,
        //IRestaurantManagerModel
        managerName: req.body.managerName,
        restaurantOwnerID: req.body.restaurantOwnerID,
        restuarantID: req.body.restaurantID
      };

      console.log("[App] Creating new restaurant manager with:" + JSON.stringify(createManager));
      this.RestaurantManagers.createRestaurantManager(res, createManager);
      
    });

    /* Restaurant Routes */
    router.get('/api/restaurants/', (req, res) => {
        console.log('Query All Restaurants');
        this.Restaurants.retrieveAllRestaurants(res);
    });
    router.get('/api/getrestaurant/:restaurantId', (req, res) => {
      console.log('Query Restaurant with restaurantId');
      let filter: object = {
        restaurantID: req.params.restaurantId
      };
     const result= this.Restaurants.getRestaurantByID(filter);
     res.send(result);
    });

    /* Item Routes */

    /* GET Routes */

    /**
     * Get all items
     * @returns - JSON obj of all items as a response
     */
    router.get('/api/items/', (req, res) => {
      console.log('Query All items');
      this.Items.retrieveAllItems(res);
    });

    /**
     * Get a specific item by ID
     * @param itemID
     *  - The ID of the item to retrieve
     * @returns
     * - JSON obj of the item with the specified ID as a response
     */
    router.get('/api/getItem/:itemID',(req, res) => {
      console.log('Query item with itemID');
      let filter: object = {
        itemID: req.params.itemID
      };
      res.json(this.Items.getItem(filter));
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
    router.post('/api/createItem', (req, res) => {
      console.log('Insert item into items collection');
      let createItem: object = {
        ItemID: crypto.randomUUID(),
        itemName: req.body.itemName,
        itemDecription:req.body.itemDecription,
        itemPrice:req.body.itemPrice,
        itemImg: req.body.itemImg,
        restaurantID: req.body.restaurantId,
        menusID:req.body.menusid
       
      };
      console.log(createItem)
      this.Items.createItem(res,createItem);
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
    router.get('/api/menus/:restaurantID', (req, res) => {
      // Get the RestaurantId URL parameters
      let restaurantID: string = req.params.restaurantID;

      console.log("[App] Query all menus for: " + restaurantID);

      // Query the database for all menus
      this.Menus.retrieveAllMenus(res, { restaurantID: restaurantID });
    });
    /**
     * Get all menu sections for a specific menu for a specific restaurant
     * @param restaurantId: string - ID of the restaurant for which to retrieve all menus
     * @param menuId: string - ID of the menu for which to retrieve all menu sections
     */
    router.get('/api/menus/:restaurantID/:menuID', (req, res) => {
      // Get the RestaurantId, RestaurantOwnerId, and menuId from URL parameters
      let restaurantID: string = req.params.restaurantID;
      let menuID: string = req.params.menuID;

      console.log("Query all menu sections for: " + menuID + " for restaurant: " + restaurantID);

      // Query the database for all menus
      this.Menus.retrieveMenuSections(res, { restaurantID: restaurantID, menuID: menuID });
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
    router.post('/api/menus/create-menu', (req, res) => {
      // Pre check: Check if the restaurant exists
      // Get RestaurantID
      let restaurantID: string = req.body.restaurantID;
      try{
        const checkRestaurant = this.Restaurants.getRestaurantByID({restaurantID: restaurantID});
        if(JSON.stringify(checkRestaurant) == '{}')
        res.status(400).json({ message: 'Restaurant is not found'});
      }catch (error){
        console.error(error);
        res.status(500).json({message: 'Internal server error '});
      }
      // Get all the parameters from the request body
      let createMenu: object = {
        menuID: crypto.randomUUID(),
        restaurantID: req.body.restaurantID,
        menuName: req.body.menuName,
        menuDescription: req.body.menuDescription,
        menuSections: req.body.menuSections,
        menuStartTime: parseTime(req.body.menuStartTime),
        menuEndTime: parseTime(req.body.menuEndTime)
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
    router.post('/api/menus/add-section', (req, res) => {
      // Get the RestaurantId, menuId, sectionName from req body
      let restaurantID: string = req.body.restaurantID;
      let menuID: string = req.body.menuID;
      let sectionName: string = req.body.sectionName;

      console.log("Adding " + sectionName + " : " + menuID + " for restaurant: " + restaurantID);

      // Query the database to add a section to the menu
      this.Menus.addMenuSection(res, { restaurantID: restaurantID, menuID: menuID }, sectionName);
    });

    /**
     * Add an existing item to an existing section in an existing menu
     * @param req
     *  - restaurantId: string - restaurantID to which the menu belongs
     *  - menuId: string - menuID to which the section belongs
     *  - menuSection: string - menuSection to which the item  should be added to
     *  - itemId: string - itemID of the item to be added
     */
    router.post('/api/items/add-item', (req, res) => {
      // Get the RestaurantId, menuId, sectionName, itemId from req body
      let restaurantID: string = req.body.restaurantID;
      let menuID: string = req.body.menuID;
      let sectionName: string = req.body.sectionName;
      let itemID: string = req.body.itemID;

      try{
        // Pre check: check if the item exists in the database
        const checkItem = this.Items.getItem({ itemID: itemID });
        // check for empty JSON
        if (JSON.stringify(checkItem) === '{}') {
          res.status(400).json({ message: 'Item is not found' });
          return;
        }

        // Check if the item already exists in the menu section
        const existingItem = this.Menus.checkItemInSection({ restaurantID: restaurantID, menuID: menuID }, itemID);
        if (existingItem) {
          res.status(400).json({ message: 'Item already exists in the section' });
          return;
        }

        // Add the item to the menu section
        this.Menus.addMenuItem(res,
          {
            restaurantID: restaurantID,
            menuID: menuID,
            sectionName: sectionName,
            itemID: itemID
          }
        );
        
      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error '});
      }
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
    router.patch('/api/menus/update-menu-time', (req, res) => {
      // Get the new start and end time from req body
      let startTime: Date = parseTime(req.body.startTime);
      let endTime: Date = parseTime(req.body.endTime);
      // Get the RestaurantId and menuId from req body
      let filter: object = {
        restaurantID: req.body.restaurantId,
        menuID: req.body.menuId,
      };

      console.log("[App] Updating menu time");

      // Query the database to add a section to the menu
      this.Menus.updateMenuTime(res, filter, startTime, endTime);
    });


    // DELETE Routes

    this.expressApp.use('/', router)
    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }

}

export { App };

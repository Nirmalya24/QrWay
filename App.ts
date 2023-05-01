import * as express from 'express';
import * as bodyParser from 'body-parser';
// import {ListModel} from './model/ListModel';
// import { TaskModel } from './model/TaskModel';
import { UsersModel } from './model/UsersModel';
import { RestaurantModel } from './model/RestaurantModel';
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
    this.Items = new ItemModel();
    this.Menus = new MenuModel();
    // this.Tasks = new TaskModel();
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

    /* Restaurant Routes */
    router.get('/api/restaurants/', (req, res) => {
        console.log('Query All Restaurants');
        this.Restaurants.retrieveAllRestaurants(res);
    });

   
    /* Item Routes */
    router.get('/api/items/', (req, res) => {
      console.log('Query All items');
      this.Items.retrieveAllItems(res);
    });
    router.get('/api/getItem/:itemID', (req, res) => {
      console.log('Query item with itemID');
      this.Items.getItem(req,res);
    });
    router.post('/api/createItem', (req, res) => {
      console.log('Insert item into items collection');
      this.Items.createItem(res,req.body);
    });          

    /**
     * Menu Routes
     */

    /* GET Routes */

    // Get all menus
    router.get('/api/menus/:restaurantId', (req, res) => {
      // Get the RestaurantId URL parameters
      let restaurantId: string = req.params.restaurantId;

      console.log("[App] Query all menus for: " + restaurantId);

      // Query the database for all menus
      this.Menus.retrieveAllMenus(res, { restaurantID: restaurantId });
    });

    // Get menu sections
    router.get('/api/menus/:restaurantId/:menuId', (req, res) => {
      // Get the RestaurantId, RestaurantOwnerId, and menuId from URL parameters
      let restaurantId: string = req.params.restaurantId;
      let menuId: string = req.params.menuId;

      console.log("Query all menu sections for: " + menuId + " for restaurant: " + restaurantId);

      // Query the database for all menus
      this.Menus.retrieveMenuSections(res, { restaurantID: restaurantId, menuID: menuId });
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
      // TODO: Implement prechecks

      // Pre check: Check if the restaurant exists

      // Get all the parameters from the request body
      let createMenu: object = {
        menuID: crypto.randomUUID(),
        restaurantID: req.body.restaurantId,
        menuName: req.body.menuName,
        menuDescription: req.body.menuDescription,
        menuSections: req.body.menuSections,
        menuStartTime: parseTime(req.body.menuStartTime),
        menuEndTime: parseTime(req.body.menuEndTime)
      };
      console.log("[App] Creating new menu with:" + JSON.stringify(createMenu));
      this.Menus.createMenu(res, createMenu);
    });



    // Add a section to a menu
    router.post('/api/menus/add-section', (req, res) => {
      // Get the RestaurantId, menuId, sectionName from req body
      let restaurantId: string = req.body.restaurantId;
      let menuId: string = req.body.menuId;
      let sectionName: string = req.body.sectionName;

      console.log("Adding " + sectionName + " : " + menuId + " for restaurant: " + restaurantId);

      // Query the database to add a section to the menu
      this.Menus.addMenuSection(res, { restaurantID: restaurantId, menuID: menuId }, sectionName);
    });

    // Add item to a section in menu
    router.post('/api/items/add-item', (req, res) => {
      // Get the RestaurantId, menuId, sectionName, itemId from req body
      let restaurantId: string = req.body.restaurantId;
      let menuId: string = req.body.menuId;
      let sectionName: string = req.body.sectionName;
      let itemId: string = req.body.itemId;

      try{
        // Pre check: check if the item exists in the database
        // this.Items.retrieveItemByID(res, { itemId: itemId }); // TODO : implement this
        // console.log("Adding " + itemName + " : " + menuId + " for restaurant: " + restaurantId);
        // Query the database to add a section to the menu
        const item = this.Items.retrieveItemByID(res, { itemID: itemId });
        if (item == undefined || item == null) {
        res.status(400).json({ message: 'Item is not found' });
        return;
        }

        // add menu section
        const menuSection = this.Menus.retrieveMenuSections(res, { restaurantID: restaurantId, menuID: menuId, sectionName });
        if (menuSection === undefined || menuSection === null) {
        res.status(400).json({ message: 'Menu section is not found' });
        return;
        }
        // check again if the menu item is in the menu section
        const existingItem = menuSection.items.find((itemObj: any) => itemObj.itemId === itemId);
        if (existingItem) {
        res.status(400).json({ message: 'Item already exists in the section' });
        return;
        }
        // add the item to the menu section

       
        
      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error '});
      }

    });

    // PATCH Routes

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
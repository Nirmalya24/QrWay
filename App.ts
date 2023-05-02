import * as express from 'express';
import * as bodyParser from 'body-parser';
// import {ListModel} from './model/ListModel';
// import { TaskModel } from './model/TaskModel';
import { UsersModel } from './model/UsersModel';
import { RestaurantModel } from './model/RestaurantModel';
import { RestaurantManagerModel } from './model/RestaurantManagerModel';
import { RestaurantOwnerModel } from './model/RestaurantOwnerModel';
import { ItemModel } from './model/ItemModel';
import * as crypto from 'crypto';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;
  public Users: UsersModel;
  public Restaurants:RestaurantModel;
  public Items:ItemModel;
  public RestaurantManagers:RestaurantManagerModel;
  public RestaurantOwners:RestaurantOwnerModel;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.Users = new UsersModel();
    this.Restaurants=new RestaurantModel();
    this.Items=new ItemModel();
    this.RestaurantManagers = new RestaurantManagerModel();
    this.RestaurantOwners = new RestaurantOwnerModel();
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
    router.get('/healthcheck', (req, res, next) => {
      res.json({ "healthy": true }).status(200);
    });
    router.get('/app/restaurants/', (req, res) => {
      console.log('Query All Restaurants');
      this.Restaurants.retrieveAllRestaurants(res);
    });
    router.get('/app/items/', (req, res) => {
      console.log('Query All items');
      this.Items.retrieveAllItems(res);
    });
    router.get('/app/restaurantmanagers/', (req, res) => {
      console.log('Query All Restaurant Managers');
      this.RestaurantManagers.retrieveAllRestaurantManagers(res);
    });
    router.get('/app/restaurantowners/', (req, res) => {
      console.log('Query All Restaurant Owners');
      this.RestaurantOwners.retrieveAllRestaurantOwners(res);
    });
    router.post('/app/restaurantmanagers/create-manager', (req, res) => {
      //check if restaurantOwnerID passed is empty
      if (req.body.restaurantOwnerID === "") 
      {
        console.log("restaurantOwnerID is invalid!");
        res.send("restaurantOwnerID is invalid!");
        return;
      }
      
      
      //params from request body
      let createManager: object = {
        userID: crypto.randomUUID(),
        password: req.body.password,
        connectStatus: req.body.connectStatus,
        //IRestaurantManagerModel
        managerName: req.body.managerName,
        restaurantOwnerID: req.body.restaurantOwnerID,
        restuarantID: req.body.restaurantID
      };

      console.log("[App] Creating new restaurant manager with:" + JSON.stringify(createManager));
      this.RestaurantManagers.createRestaurantManager(res, createManager)
      
    })

    this.expressApp.use('/', router);
    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }

}

export { App };
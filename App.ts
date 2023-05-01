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
  // public Tasks:TaskModel;

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

    // TODO: delete this
    // router.get('/app/list/:listId/count', (req, res) => {
    //     var id = req.params.listId;
    //     console.log('Query single list with id: ' + id);
    //     this.Tasks.retrieveTasksCount(res, {listId: id});
    // });

    // router.post('/app/list/', (req, res) => {
    //   const id = crypto.randomBytes(16).toString("hex");
    //   console.log(req.body);
    //     var jsonObj = req.body;
    //     jsonObj.listId = id;
    //     this.Lists.model.create([jsonObj], (err) => {
    //         if (err) {
    //             console.log('object creation failed');
    //         }
    //     });
    //     res.send('{"id":"' + id + '"}');
    // });

    // router.post('/app/list2/', (req, res) => {
    //   const id = crypto.randomBytes(16).toString("hex");
    //   console.log(req.body);
    //     var jsonObj = req.body;
    //     jsonObj.listId = id;
    //     let doc = new this.Lists.model(jsonObj);
    //     doc.save((err) => {
    //        console.log('object creation failed');
    //     });
    //     res.send('{"id":"' + id + '"}');
    // });

    // router.get('/app/list/:listId', (req, res) => {
    //     var id = req.params.listId;
    //     console.log('Query single list with id: ' + id);
    //     this.Tasks.retrieveTasksDetails(res, {listId: id});
    // });

    // router.get('/app/list/', (req, res) => {
    //     console.log('Query All list');
    //     this.Lists.retrieveAllLists(res);
    // });

    // router.get('/app/listcount', (req, res) => {
    //   console.log('Query the number of list elements in db');
    //   this.Lists.retrieveListCount(res);
    // });

    this.expressApp.use('/', router);

    this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
    this.expressApp.use('/images', express.static(__dirname + '/img'));
    this.expressApp.use('/', express.static(__dirname + '/pages'));

  }

}

export { App };
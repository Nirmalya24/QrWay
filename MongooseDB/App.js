"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const ListModel_1 = require("./model/ListModel");
const TaskModel_1 = require("./model/TaskModel");
const crypto = require("crypto");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.Lists = new ListModel_1.ListModel();
        this.Tasks = new TaskModel_1.TaskModel();
    }
    // Configure Express middleware.
    middleware() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get('/app/list/:listId/count', (req, res) => {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            this.Tasks.retrieveTasksCount(res, { listId: id });
        });
        router.post('/app/list/', (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.listId = id;
            this.Lists.model.create([jsonObj], (err) => {
                if (err) {
                    console.log('object creation failed');
                }
            });
            res.send('{"id":"' + id + '"}');
        });
        router.post('/app/list2/', (req, res) => {
            const id = crypto.randomBytes(16).toString("hex");
            console.log(req.body);
            var jsonObj = req.body;
            jsonObj.listId = id;
            let doc = new this.Lists.model(jsonObj);
            doc.save((err) => {
                console.log('object creation failed');
            });
            res.send('{"id":"' + id + '"}');
        });
        router.get('/app/list/:listId', (req, res) => {
            var id = req.params.listId;
            console.log('Query single list with id: ' + id);
            this.Tasks.retrieveTasksDetails(res, { listId: id });
        });
        router.get('/app/list/', (req, res) => {
            console.log('Query All list');
            this.Lists.retrieveAllLists(res);
        });
        router.get('/app/listcount', (req, res) => {
            console.log('Query the number of list elements in db');
            this.Lists.retrieveListCount(res);
        });
        this.expressApp.use('/', router);
        this.expressApp.use('/app/json/', express.static(__dirname + '/app/json'));
        this.expressApp.use('/images', express.static(__dirname + '/img'));
        this.expressApp.use('/', express.static(__dirname + '/pages'));
    }
}
exports.App = App;

import { Component, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { ActivatedRoute } from '@angular/router';
import { restaurantModel } from 'src/app/share/restaurantModel';
import { menuModel } from 'src/app/share/menuModel';
import { HttpClient } from '@angular/common/http';
import { restaurantManagerModel } from 'src/app/share/restaurantManagerModel';
import { Router } from '@angular/router';
import {EditRestaurantService} from  '../services/edit-restaurant/edit-restaurant.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';
import IMenuModelAngular from '../share/IMenuModelAngular';
import IRestaurantManagerModelAngular from '../share/IRestaurantManagerModelAngular';
// ...
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css'],
})
export class EditRestaurantComponent {


  curRestaurant: restaurantModel;
  //curRestaurantName:string="";
  msg: string = '';
  //restaurant variable
  availableManager: any[] = [];
  selectedManager: any[] = [];
  managers: IRestaurantManagerModelAngular[] = [];
  selectedManagers: IRestaurantManagerModelAngular[] ;
  availableManagers: IRestaurantManagerModelAngular[];

  //menu variable
  availableMenu: menuModel[] = [];
  selectedMenu: IMenuModelAngular[] = [];
  menus: IMenuModelAngular[] = [];
  selectedMenus: IMenuModelAngular[] ;
  availableMenus: IMenuModelAngular[] ;
  baseURL: string = 'http://localhost:8000/api';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private editRestaurantService:EditRestaurantService
  ) {
    this.curRestaurant ={}as IRestaurantModelAngular;
    this.selectedManagers=[]
    this.availableManagers=[]
    this.selectedMenus=[]
    this.availableMenus=[]
    
    //this.curRestaurant = new restaurantModel();
    //console.log(this.curRestaurant.managerID);
    //this.getRestaurant();
    //this.getManagers();
    // this.getMeuns();
  }

  openDeleteDialog():void {
    this.dialog.open(DialogBoxComponent, {
      data: {
        restaurantID: this.curRestaurant.restaurantID
      }
    });
  }

  public addManager(filter: any): any {
    console.log(filter);
    if (filter.length == 0) return;
    var idx = this.availableManagers.map((e) => e.managerName).indexOf(filter);
    var item = this.availableManagers[idx];
   // item.restaurantID.push(this.curRestaurant.restaurantID);
    console.log('currentManager' + item.restaurantID);
    this.availableManagers.splice(idx, 1);
    this.selectedManagers.push(item);
    this.availableManager = [];
    this.selectedManager = [];
    console.log(this.selectedManagers);
  }

  public removeManager(filter: any): any {
    if (filter.length == 0) return;
    var idx = this.selectedManagers.map((e) => e.managerName).indexOf(filter);
    var item = this.selectedManagers[idx];
    //get the index of restaurantID from the selected manager
    var itemIdx = item.restaurantID.indexOf(this.curRestaurant.restaurantID);
    console.log('itemIdx' + itemIdx);
    item.restaurantID.slice(itemIdx, 1);
    console.log('currentManager:' + item.restaurantID);
    //update select boxes
    this.selectedManagers.splice(idx, 1);
    this.availableManagers.push(item);
    this.availableManager = [];
    this.selectedManager = [];
  }

  public addMenu(filter: any): any {
    console.log(filter);
    if (filter.length == 0) return;
    var idx = this.availableMenus.map((e) => e.menuName).indexOf(filter);
    var item = this.availableMenus[idx];
    item.public = true;
    this.availableMenus.splice(idx, 1);
    this.selectedMenus.push(item);
    this.availableMenu = [];
    this.selectedMenu = [];
  }

  public removeMenu(filter: any): any {
    if (filter.length == 0) return;
    var idx = this.selectedMenus.map((e) => e.menuName).indexOf(filter);
    var item = this.selectedMenus[idx];
    item.public = false;
    this.selectedMenus.splice(idx, 1);
    this.availableMenus.push(item);
    this.availableMenu = [];
    this.selectedMenu = [];
  }

  public setAvailableManager(event: any): any {
    this.availableManager = event.target.value;
  }
  public setSelectedManager(event: any): any {
    this.selectedManager = event.target.value;
  }
  public setAvailableMenu(event: any): any {
    this.availableMenu = event.target.value;
  }
  public setSelectedMenu(event: any): any {
    this.selectedMenu = event.target.value;
   }
  public async getManagers(): Promise<any> {
    console.log(
      'this.curRestaurant.restaurantOwnerID:' +
        this.curRestaurant.restaurantOwnerID
    );
  
    // this.http
    //   .get<any>(
    //     `${this.baseURL}/restaurantmanagers/${this.curRestaurant.restaurantOwnerID}`
    //   )
    this.editRestaurantService.getManagers(this.curRestaurant.restaurantOwnerID)
      .subscribe((data:any) => {
        this.managers = data;
        console.log('get managers from API' + this.managers);
        this.managers.map((manager) => {
          console.log('manager ' + manager.userID);
          console.log(this.curRestaurant.managerID);
          console.log(this.curRestaurant.managerID.includes(manager.userID));
          // if(this.curRestaurant.managerID.indexOf(manager.userID)>0)
          //if(manager.restaurantID==this.curRestaurant.restaurantID)
          if (this.curRestaurant.managerID.includes(manager.userID))
            this.selectedManagers.push(manager);
          //(manager.restaurantID=="")
          else this.availableManagers.push(manager);
        });
      });
  }
  public async getMeuns(): Promise<any> {
    console.log('get menus' + this.curRestaurant.restaurantID);
    this.editRestaurantService.getMenus(this.curRestaurant.restaurantID)
      .subscribe((data:any) => {
        this.menus = data;
        console.log('get managers from API' + this.managers);
        this.menus.map((menu) => {
          console.log('menu:' + menu.restaurantID);
          if (menu.restaurantID == this.curRestaurant.restaurantID)
            this.selectedMenus.push(menu);
          else if (menu.restaurantID == '') this.availableMenus.push(menu);
        });
      });
  }
  public updateRestaurant(): any {
    if (this.selectedManagers.length == 0) {
      //  console.log(this.selectedMenu.length)
      alert('Selected managers box must be not empty');
      return;
    }
    

    this.setUpdateRestaurant();
    this.editRestaurantService.updateRestaurant(this.curRestaurant);
    // const headers = { 'Content-Type': 'application/json' };
    // console.log(JSON.stringify(this.curRestaurant));
    // const result = this.http
    //   .post<restaurantModel>(
    //     `${this.baseURL}/updateRestaurant`,
    //     JSON.stringify(this.curRestaurant),
    //     { headers: headers }
    //   )
    //   .subscribe((isupdate) => {
    //     console.log(isupdate);
    //   });
  }

  public setUpdateRestaurant(): void {
    this.curRestaurant.managerID.splice(0, this.curRestaurant.managerID.length);
    this.curRestaurant.menusID.splice(0, this.curRestaurant.menusID.length);
    var y = typeof this.curRestaurant.managerID;
    console.log('y:' + y);

    this.selectedManagers.map((manager) => {
      this.curRestaurant.managerID.push(manager.userID);
    });
    this.selectedMenus.map((menu) => {
      this.curRestaurant.menusID.push(menu.menuID);
    });
    console.log('setSelectedManagerID:' + this.curRestaurant.managerID);
    console.log('setselectedMenusID:' + this.curRestaurant.menusID);
    alert('Update Success');
    localStorage.setItem('restaurant', JSON.stringify(this.curRestaurant));
    this.router.navigate(['/restaurant',this.curRestaurant.restaurantID])
  }
  clickEvent() {
    this.msg = 'Button is Clicked';
    return this.msg;
  }
  ngOnInit() {
    this.curRestaurant= this.editRestaurantService.getRestaurant();
    if(this.curRestaurant !==undefined){
      localStorage.setItem('restaurant', JSON.stringify(this.curRestaurant));
    }
    if(this.curRestaurant==undefined){
      var data:any = localStorage.getItem('restaurant'||'{}');
      this.curRestaurant=JSON.parse(data)
    }
   // this.curRestaurant=JSON.parse(localStorage.getItem('restaurant'));
   // var y = typeof this.curRestaurant.managerID;
   // console.log("tyoe of managerID"+y)
    console.log( "managerID"+this.curRestaurant.managerID[0]);
    //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.route.queryParams.subscribe(curRes => {
    //   this.curRestaurant.restaurantID = curRes['restaurantID'];
    //   this.curRestaurant.restaurantOwnerID = curRes['restaurantOwnerID'];
    //   this.curRestaurant.managerID = curRes['managerID'];
    //   this.curRestaurant.menusID = curRes['menusID'];
    //   this.curRestaurant.restaurantName = curRes['restaurantName'];
    //   this.curRestaurant.tag = curRes['tag'];
    //   this.curRestaurant.description = curRes['description'];
    //   this.curRestaurant.restaurantImage = curRes['restaurantImage'];
    //   //console.log("this.curRestaurant.restaurantID:"+this.curRestaurant.restaurantID)
    //   console.log(
    //     'this.curRestaurant.managerID:' + this.curRestaurant.managerID
    //   );
       this.getManagers();
       this.getMeuns();
    // });    

    // this.route.params.subscribe((curRes) => {
    //   console.log('curRes' + curRes['queryParams']);

    //   this.curRestaurant.restaurantID = curRes['restaurantID'];
    //   this.curRestaurant.restaurantOwnerID = curRes['restaurantOwnerID'];
    //   this.curRestaurant.managerID = curRes['managerID'].split(',');
    //   this.curRestaurant.menusID = curRes['menusID'].split(',');
    //   this.curRestaurant.restaurantName = curRes['restaurantName'];
    //   this.curRestaurant.tag = curRes['tag'];
    //   this.curRestaurant.description = curRes['description'];
    //   this.curRestaurant.restaurantImage = curRes['restaurantImage'];
    //   //console.log("this.curRestaurant.restaurantID:"+this.curRestaurant.restaurantID)
    //   console.log(
    //     'this.curRestaurant.managerID:' + this.curRestaurant.managerID
    //   );
    //   this.getManagers();
    //   this.getMeuns();

    //   // use the ID to fetch the restaurant data from a data source
    // });
    // this.getRestaurant();
    //this.getManagers();
    //  this.getMeuns();


  }

}

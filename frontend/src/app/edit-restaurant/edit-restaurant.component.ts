import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { restaurantModel } from 'src/app/share/restaurantModel';
import { menuModel } from 'src/app/share/menuModel';
import { Router } from '@angular/router';
import { EditRestaurantService } from '../services/edit-restaurant/edit-restaurant.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';
import IMenuModelAngular from '../share/IMenuModelAngular';
import IRestaurantManagerModelAngular from '../share/IRestaurantManagerModelAngular';
@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css'],
})
export class EditRestaurantComponent {


  curRestaurant: restaurantModel;
  msg: string = '';
  //restaurant variable
  availableManager: any[] = [];
  selectedManager: any[] = [];
  managers: IRestaurantManagerModelAngular[] = [];
  selectedManagers: IRestaurantManagerModelAngular[];
  availableManagers: IRestaurantManagerModelAngular[];

  //menu variable
  availableMenu: menuModel[] = [];
  selectedMenu: IMenuModelAngular[] = [];
  menus: IMenuModelAngular[] = [];
  selectedMenus: IMenuModelAngular[];
  availableMenus: IMenuModelAngular[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private editRestaurantService: EditRestaurantService
  ) {
    this.curRestaurant = {} as IRestaurantModelAngular;
    this.selectedManagers = []
    this.availableManagers = []
    this.selectedMenus = []
    this.availableMenus = []
  }

  openDeleteDialog(): void {
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

    this.editRestaurantService.getManagers(this.curRestaurant.restaurantOwnerID)
      .subscribe((data: any) => {
        this.managers = data;
        console.log('get managers from API' + this.managers);
        this.managers.map((manager) => {
          console.log('manager ' + manager.userID);
          console.log(this.curRestaurant.managerID);
          console.log(this.curRestaurant.managerID.includes(manager.userID));
          if (this.curRestaurant.managerID.includes(manager.userID))
            this.selectedManagers.push(manager);
          else this.availableManagers.push(manager);
        });
      });
  }
  public async getMeuns(): Promise<any> {
    console.log('get menus' + this.curRestaurant.restaurantID);
    this.editRestaurantService.getMenus(this.curRestaurant.restaurantID)
      .subscribe((data: any) => {
        this.menus = data;
        console.log('get managers from API' + this.managers);
        this.menus.map((menu) => {
          console.log('menu:' + menu.restaurantID);
         // if (menu.restaurantID == this.curRestaurant.restaurantID )
          if(this.curRestaurant.menusID.includes(menu.menuID))
            this.selectedMenus.push(menu);
          else if (menu.restaurantID == this.curRestaurant.restaurantID ) this.availableMenus.push(menu);
        });
      });
  }
  public updateRestaurant(): any {
    // if (this.selectedManagers.length == 0) {
    //   alert('Selected managers box must be not empty');
    //   return;
    // }


    this.setUpdateRestaurant();
    this.editRestaurantService.updateRestaurant(this.curRestaurant);
  }

  public setUpdateRestaurant(): void {
    this.curRestaurant.managerID.splice(0, this.curRestaurant.managerID.length);
    this.curRestaurant.menusID.splice(0, this.curRestaurant.menusID.length);


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
    this.router.navigate(['/restaurant', this.curRestaurant.restaurantID])
  }
  clickEvent() {
    this.msg = 'Button is Clicked';
    return this.msg;
  }
  ngOnInit() {
    this.curRestaurant = this.editRestaurantService.getRestaurant();
    if (this.curRestaurant !== undefined) {
      localStorage.setItem('restaurant', JSON.stringify(this.curRestaurant));
    }
    if (this.curRestaurant == undefined) {
      var data: any = localStorage.getItem('restaurant' || '{}');
      this.curRestaurant = JSON.parse(data)
    }
    console.log("managerID" + this.curRestaurant.managerID[0]);
    this.getManagers();
    this.getMeuns();

  }

}

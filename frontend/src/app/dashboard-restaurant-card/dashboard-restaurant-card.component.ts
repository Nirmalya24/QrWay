import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard/dashboard.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';
import {EditRestaurantService} from  '../services/edit-restaurant/edit-restaurant.service';

@Component({
  selector: 'app-dashboard-restaurant-card',
  templateUrl: './dashboard-restaurant-card.component.html',
  styleUrls: ['./dashboard-restaurant-card.component.css'],
})
export class DashboardRestaurantCardComponent {
  baseURL: string = 'http://localhost:3000/api';
  menuID: string = 'b061cc9c-e85c-11ed-a05b-0242ac120003';
  menus: any = '';
  
  @Input() currentRestaurant!: IRestaurantModelAngular;
  //restaurantData = this.currentRestaurant.restaurantID;

  constructor(private router: Router, private http: HttpClient, private editRestaurantService :EditRestaurantService) {
    this.currentRestaurant = {} as IRestaurantModelAngular
   }

  restaurant: any = {
    restaurantName: '',
    restaurantID: '',
    managerID: [],
    restaurantOwnerID: '',
    menusID: []
  }

  public viewRestaurant(): any {
    this.router.navigate(['/menus', this.currentRestaurant.restaurantID]);
    console.log('[view button clicked] redirect to', this.currentRestaurant.restaurantID)
  }

  public viewMenus(restaurantID: string): any {
    this.router.navigate(['/menus', restaurantID]);
    console.log('[Dashboard Restaurant Card] View button clicked: redirect to', restaurantID);
  }

  editRes(){
    var y = typeof this.currentRestaurant.managerID; 
    console.log(" this.curRestaurant Type:"+y);
    console.log(" this.curRestaurant:"+ this.currentRestaurant.managerID[0]);
    console.log("clicked"+this.currentRestaurant);
    this.editRestaurantService.setRestaurant(this.currentRestaurant);
    this.router.navigate(['/restaurant',this.currentRestaurant.restaurantID]);
  }

  ngOnInit() {
    console.log("[Dashboard Restaurant Card]", this.currentRestaurant);
  }
}

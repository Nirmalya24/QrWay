import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard/dashboard.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';

@Component({
  selector: 'app-dashboard-restaurant-card',
  templateUrl: './dashboard-restaurant-card.component.html',
  styleUrls: ['./dashboard-restaurant-card.component.css']
})
export class DashboardRestaurantCardComponent {
  baseURL: string = 'http://localhost:8000/api';
  menuID: string = 'b061cc9c-e85c-11ed-a05b-0242ac120003';
  menus: any = '';
  
  @Input() currentRestaurant!: IRestaurantModelAngular;


  constructor(private router: Router, private http: HttpClient) {
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
    this.router.navigate(['/menus']);
    console.log('[view button clicked] redirect to', this.currentRestaurant.restaurantID)

  }

  ngOnInit() {
    console.log("[Dashboard Restaurant Card]", this.currentRestaurant);
  }
}

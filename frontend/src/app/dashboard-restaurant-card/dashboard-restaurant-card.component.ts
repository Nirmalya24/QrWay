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
    this.http.get<any>(`${this.baseURL}/menus/${this.menuID}`).subscribe(data => {
      this.menus = data;
      console.log(this.menus);
    })

    //this.router.navigate(['/menus']);
    console.log('redirect success')

  }

  ngOnInit() {
    console.log("[Dashboard Restaurant Card]", this.currentRestaurant);
    this.viewRestaurant();
  }
}

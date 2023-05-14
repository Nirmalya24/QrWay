import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardServiceService } from '../services/dashboard-service.service';

@Component({
  selector: 'app-dashboard-restaurant-card',
  templateUrl: './dashboard-restaurant-card.component.html',
  styleUrls: ['./dashboard-restaurant-card.component.css']
})
export class DashboardRestaurantCardComponent {
  baseURL: string = 'http://localhost:8000/api';
  menuID: string = 'b061d548-e85c-11ed-a05b-0242ac120003';
  menus: any = '';

  constructor(private router: Router, private http: HttpClient, dashboardService: DashboardServiceService) { }

  restaurant: any = {
    restaurantName: '',
    restaurantID: '',
    managerID: [],
    restaurantOwnerID: '',
    menusID: []
  }

  @Input() currentRestaurant = [];

  public viewRestaurant(): any {
    this.http.get<any>(`${this.baseURL}/menus/${this.menuID}`).subscribe(data => {
      this.menus = data;
      console.log(this.menus);
    })

    //this.router.navigate(['/menus']);
    console.log('redirect success'); 

  }


  ngOnInit() {
    this.viewRestaurant();
  }

  
}

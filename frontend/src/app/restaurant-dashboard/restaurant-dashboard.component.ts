import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent {
  public restaurants: any[] = [];
  public userID="";

  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
     this.dashboardService.getUserID().subscribe((res:any)=>{
      console.log(JSON.stringify(res));
      this.userID = res;
      localStorage.setItem("userID",this.userID);
      console.log(`[restaurant-dashboard.component] : ${localStorage.getItem('userID')}`);

    });
    this.dashboardService.getUserID().subscribe((res:any)=>{
      console.log(JSON.stringify(res));
      this.userID = res;
      localStorage.setItem("userID",this.userID);
      console.log(`[restaurant-dashboard.component] : ${localStorage.getItem('userID')}`);

    });
    this.dashboardService.getAllRestaurants(JSON.parse(JSON.stringify(localStorage.getItem('userID')))).subscribe((res: any) => {
      this.restaurants = res;
    });
    console.log(`[restaurant-dashboard.component] Restaurants: ${this.restaurants}`);
   
  }
}

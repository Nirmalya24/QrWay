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
  public user: any = {};

  constructor(private dashboardService: DashboardService) { }
  ngOnInit(): void {
     this.dashboardService.getUser().subscribe((res:any)=>{
      console.log("[DashboardService]: ", JSON.stringify(res));
      this.user = res;
      localStorage.setItem("userID",this.user.userID);
      localStorage.setItem("name",this.user.name);
      localStorage.setItem("email",this.user.email);
      localStorage.setItem("profile_image",this.user.profile_image);
      console.log(`[restaurant-dashboard.component] : ${localStorage.getItem('userID')}`);

    });
    this.dashboardService.getAllRestaurants(JSON.parse(JSON.stringify(localStorage.getItem('userID')))).subscribe((res: any) => {
      this.restaurants = res;
    });
    console.log(`[restaurant-dashboard.component] Restaurants: ${this.restaurants}`);
   
  }
}

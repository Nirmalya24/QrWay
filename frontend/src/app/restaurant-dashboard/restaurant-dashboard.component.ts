import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent {
  private baseURL: string = 'http://localhost:8000/api';
  public restaurants: any[] = [];

  constructor(private http: HttpClient, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getAllRestaurants().subscribe((res: any) => {
      this.restaurants = res;
    });
    console.log(`Restaurants: ${this.restaurants}`);
  }

}

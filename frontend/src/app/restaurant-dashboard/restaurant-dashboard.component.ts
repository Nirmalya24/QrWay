import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css']
})
export class RestaurantDashboardComponent {
  private baseURL: string = 'http://localhost:8000/api';
  public restaurants: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  public getRestaurants(): any {
    this.http.get<any>(`${this.baseURL}/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003`).subscribe(data => {
      this.restaurants = data;

    })
    console.log(`[Restaurant Dashboard]: All Restaurants onInit: ${this.restaurants}`);

  }

}

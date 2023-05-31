import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  baseURL: string = 'http://localhost:3000/api';
  restaurantIDs: any[] = [];
  restaurants: any[] = [];

  constructor(private http: HttpClient, private headers: HttpHeaders) { }

  // Fetch all restaurants from backend
  public getAllRestaurant(): any {
    this.http.get<any>(`${this.baseURL}/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003`).subscribe(data => {
      this.restaurantIDs = data;
    })

    console.log(`[Dashboard Service] getAllRestaurant: ${this.restaurantIDs}`);
  }
}

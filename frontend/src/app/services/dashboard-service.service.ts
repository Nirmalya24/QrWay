import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  baseURL: string = environment.apiUrl;
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

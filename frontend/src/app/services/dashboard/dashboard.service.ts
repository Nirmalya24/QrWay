import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL: string = 'http://localhost:8000/api';
  //private restaurantIDs: any[] = [];
  //private restaurants: any[] = [];
  //private menus: any[] = [];
  //private menuID: any[] = [];

  constructor(private http: HttpClient) { }

  // Fetch all restaurants from backend
  public getAllRestaurants(): any {
    return this.http.get<any>(`${this.baseURL}/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003`);
  }

  // Fetch all menus from backend
  public getAllMenus(restaurantID: string):any {
    return this.http.get<any>(`${this.baseURL}/menus/${restaurantID}`);
    }
    
  }



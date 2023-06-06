import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fetch all restaurants from backend
  public getAllRestaurants(UserID:String): any {
    return this.http.get<any>(`${this.baseURL}/restaurant/all/${UserID}`);
  }

  // Fetch all menus from backend
  public getAllMenus(restaurantID: string):any {
    return this.http.get<any>(`${this.baseURL}/menus/${restaurantID}`);
  }

  //Fetch specific restaurant from backend
  public getRestaurant(restaurantID: string):any {
    return this.http.get<any>(`${this.baseURL}/restaurant/${restaurantID}`);
  }
  public getUser(): any {
    return this.http.get<any>(`${this.baseURL}/user`);
  }

    
  }



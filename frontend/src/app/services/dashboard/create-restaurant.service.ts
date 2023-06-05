import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import IRestaurantModelAngular from "../../share/IRestaurantModelAngular";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CreateRestaurantService {
  private baseURL: string = 'http://localhost:8080/api';
  private userID:string='';
  constructor(private http: HttpClient ) { 
  }

  createRestaurant(restaurantData: IRestaurantModelAngular,) { 
    this.userID =JSON.parse(JSON.stringify(localStorage.getItem('userID')));

    console.log("[create-restaurant.Service]"+this.userID);
    restaurantData.restaurantOwnerID = this.userID;
    console.log("[createRestaurantService] Creating a new restaurant: ", restaurantData);
    return this.http.post(`${this.baseURL}/restaurant/`, restaurantData);
  }
}

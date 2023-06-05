import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import IRestaurantModelAngular from "../../share/IRestaurantModelAngular";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CreateRestaurantService {
  baseURL: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createRestaurant(restaurantData: IRestaurantModelAngular) { 
    restaurantData.restaurantOwnerID = "d792c6be-e89c-11ed-a05b-0242ac120003";
    console.log("[createRestaurantService] Creating a new restaurant: ", restaurantData);
    return this.http.post(`${this.baseURL}/restaurant/`, restaurantData);
  }
}

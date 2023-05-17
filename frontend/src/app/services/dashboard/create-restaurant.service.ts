import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import IRestaurantModelAngular from "../../share/IRestaurantModelAngular";

@Injectable({
  providedIn: 'root'
})
export class CreateRestaurantService {
  private baseURL: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) { }

  createRestaurant(restaurantData: IRestaurantModelAngular) {
    restaurantData.restaurantOwnerID = "d792c6be-e89c-11ed-a05b-0242ac120003";
    console.log("[createRestaurantService] Creating a new restaurant: ", restaurantData);
    return this.http.post(`${this.baseURL}/restaurant/`, restaurantData);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { restaurantModel } from 'src/app/share/restaurantModel';
import IRestaurantModelAngular from 'src/app/share/IRestaurantModelAngular';

@Injectable({
  providedIn: 'root'
})
export class EditRestaurantService {
  baseURL: string = 'http://localhost:8080/api';
  restaurantIDs: any[] = [];
  restaurants: any[] = [];
  restaurant!: IRestaurantModelAngular;
  constructor(private http: HttpClient) { }

  // Fetch all restaurants from backend
  public getAllRestaurant(): any {
    this.http.get<any>(`${this.baseURL}/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003`).subscribe(data => {
      this.restaurantIDs = data;
    })
    console.log(`[Dashboard Service] getAllRestaurant: ${this.restaurantIDs}`);
  }
  public getManagers(restaurantOwnerID:string):any{
    return this.http.get<any>(`${this.baseURL}/restaurantmanagers/${restaurantOwnerID}`)
  }
  public getMenus(restaurantID:string):any{
     return this.http.get<any>(`${this.baseURL}/menus/${restaurantID}`);
  }
  public updateRestaurant(restaurant:restaurantModel){
    const headers = { 'Content-Type': 'application/json' };
    this.http
    .post<restaurantModel>(
      `${this.baseURL}/updateRestaurant`,
      JSON.stringify(restaurant),
      { headers: headers }
    )
    .subscribe((isupdate) => {
      console.log(isupdate);
    });
  }
  public setRestaurant(restaurant:IRestaurantModelAngular):void{
    this.restaurant=restaurant;
  }
  public getRestaurant():IRestaurantModelAngular{
     return this.restaurant
  }

  public deleteRestaurant(restaurantID: string): any {
    console.log("[EditRestaurantService] deleteRestaurant: " + restaurantID);
    this.http.delete(`${this.baseURL}/restaurant/delete/${restaurantID}`)
    .subscribe((deleteRes) => {
      console.log(deleteRes);
    });

  }

}

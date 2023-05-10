import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  baseURL: string = 'http://localhost:8000/api';
  title = 'frontend';
  restaurants:any[]=[];

  constructor(private http: HttpClient) {}

  public  getAllRestaurant():any {
    this.http.get<any>(`${this.baseURL}/restaurant/all/d792c6be-e89c-11ed-a05b-0242ac120003`).subscribe(data => {
      this.restaurants = data;
        console.log(this.restaurants);
    })
  }

  //public  getRestaurant():any {
    //this.http.get<any>(`${this.baseURL}/restaurant/b061dffc-e85c-11ed-a05b-0242ac120003`).subscribe(data => {
     // this.restaurant = data;
       // console.log(this.restaurant);
   // })
  //}

  ngOnInit(){
    //this.getRestaurant();
    this.getAllRestaurant();
  }

}

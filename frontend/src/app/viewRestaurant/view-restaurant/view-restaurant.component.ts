import { restaurantModel } from './../../share/restaurantModel';
import { Component, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent {
  baseURL: string = 'http://localhost:8000/api';
  menuID: string= 'b061d548-e85c-11ed-a05b-0242ac120003';
  menus:any = '';

  constructor(private router: Router, private http: HttpClient) {
  //  this.restaurant=new restaurantModel();
    this.currentRestaurant= new restaurantModel();
  }
  @Input() currentRestaurant;
  public viewRestaurant():any {
    this.http.get<any>(`${this.baseURL}/menus/${this.menuID}`).subscribe(data => {
      this.menus = data;
        console.log(this.menus);
    })

    //this.router.navigate(['/menus']);
    console.log('redirect success')

  }
  editRes(){

    var y = typeof this.currentRestaurant.managerID; 
    console.log(" this.curRestaurant Type:"+y);
    console.log(" this.curRestaurant:"+ this.currentRestaurant.managerID[0]);
    console.log("clicked"+this.currentRestaurant);
    this.router.navigate(['/editRes',this.currentRestaurant]);

  }


  ngOnInit(){
    // this.viewRestaurant();
  }

  public goToEditPage() {
    this.router.navigate(['/edit-restaurant']);
  }
  
}

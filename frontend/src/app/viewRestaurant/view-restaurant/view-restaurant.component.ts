import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent {

  restaurant:any={
    restaurantName:'',
    restaurantID:'',
    managerID:[],
    restaurantOwnerID:'',
    menusID:[]
  }

  @Input() currentRestaurant = [];

  viewRestaurant() {
   
    // Navigate to the restaurant details page
    //this.router.navigate(['/restaurant-details']);
    
  }

  
}

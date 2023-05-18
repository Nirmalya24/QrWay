import { Component, Input, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DashboardService } from '../services/dashboard/dashboard.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import IMenuModelAngular from '../share/IMenuModelAngular';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-managae-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})


export class ManageMenuComponent {
  menuOutput:any[]=[];
  restaurantOutput: { restaurantName: string } = { restaurantName: '' };
  
  constructor(private http: HttpClient, private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    var resID="";

    this.route.params.subscribe(curRes => {
      resID = curRes['restaurantID'];
      
    })

    console.log(this.route.params);
    this.dashboardService.getAllMenus(resID).subscribe((res: any) => {
      var result = JSON.stringify(res);
      this.menuOutput = JSON.parse(result);
    
      //console.log("result:"+result);
      //console.log("menuName"+this.menuOutput[0]['menuName']);
      // this.menuOutput =res
      //console.log(`Menus: ${JSON.stringify(res)}`); //${JSON.stringify(res)}
    });
    this.dashboardService.getRestaurant(resID).subscribe((res: any) => {
      var result = JSON.stringify(res);
      this.restaurantOutput = JSON.parse(result);
    });
    console.log(`MenusOut: ${this.menuOutput[0]}`);
  }

  getMenuSectionKeys(menu: IMenuModelAngular): string[] {
    return Object.keys(menu.menuSections);
  }  
}


// public generateMenuOutput(): any{
  //   console.log(this.currentRestaurant.restaurantID);
  //   this.dashboardService.getAllMenus(this.currentRestaurant.restaurantID).subscribe((res: any) => {
  //     this.menuOutput = res;
  //     console.log(`Menus: ${res}`); //${JSON.stringify(res)}
  //   });
  //   console.log(`Menus: ${this.menuOutput}`);
  // }
import { Component, Input } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DashboardService } from '../services/dashboard/dashboard.service';
import IRestaurantModelAngular from '../share/IRestaurantModelAngular';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})

export class ManageMenuComponent {
  public menus: any[] = [];

  @Input() currentRestaurant!: IRestaurantModelAngular;

  constructor(private http: HttpClient, private dashboardService: DashboardService) { 
    this.currentRestaurant = {} as IRestaurantModelAngular
  }
  
  ngOnInit(): void {
    console.log(this.currentRestaurant.restaurantID);
    this.dashboardService.getAllMenus(this.currentRestaurant.restaurantID).subscribe((res: any) => {
      this.menus = res;
      console.log(`Menus: ${JSON.stringify(res)}`);
    });
    console.log(`Menus: ${this.menus}`);
    //console.log(this.dashboardService.getAllMenus(this.currentRestaurant.restaurantID));
  }

}

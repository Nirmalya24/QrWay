import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/restaurant/menu.service';

@Component({
  selector: 'app-managae-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css'],
})


export class ManageMenuComponent {
  menuData: any;
  restaurantName: string = '';
  menuSections: any[] = [];

  //@Input() currentRestaurant: IRestaurantModelAngular;
  menuOutput:any[]=[];

  //@Output() menus: any[] = [];
  constructor(private http: HttpClient, private menuService: MenuService, private router: Router, private route: ActivatedRoute) { 
    this.menuData = this.menuService.getMenu();
    this.getMenuSections();
    this.menuService.getRestaurantName(this.menuData.restaurantID).subscribe((name: string) => {
      this.restaurantName = name;
    });
  }

  
  ngOnInit(): void {
    console.log(`[ManageMenuComponent] menu: ${JSON.stringify(this.menuData.menuSections)}`);
    // console.log(`[ManageMenuComponent] restaurantName: ${this.restaurantName}`)
  }

  getMenuSections(): void {
    this.menuSections = Object.keys(this.menuData.menuSections);
  }
}


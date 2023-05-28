import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/restaurant/menu.service';

@Component({
  selector: 'app-managae-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})


export class ManageMenuComponent {
  menuData: any;
  restaurantName: string = '';
  menuSections: any[] = [];
  menuOutput:any[]=[];

  constructor(private menuService: MenuService) { 
    this.menuData = this.menuService.getMenu();
    this.getMenuSections();
    this.menuService.getRestaurantName(this.menuData.restaurantID).subscribe((name: string) => {
      this.restaurantName = name;
    });
  }

  
  ngOnInit(): void {
  }

  getMenuSections(): void {
    this.menuSections = Object.keys(this.menuData.menuSections);
  }
}

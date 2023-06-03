import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRestaurantDialogComponent } from '../create-restaurant-dialog/create-restaurant-dialog.component';
import { CreateMenuDialogComponent } from '../create-menu-dialog/create-menu-dialog.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  shouldShowCreateRestaurantButton: boolean = true;
  shouldShowCreateMenuButton: boolean;
  shouldShowUserProfileButton: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.shouldShowCreateMenuButton = this.checkDynamicURL();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.evaluateConditions();
      });
    
  }

  ngOnInit(): void {
    this.evaluateConditions();
    
  }

  private evaluateConditions(): void {
    this.shouldShowCreateRestaurantButton = this.router.url === '/dashboard';
    this.shouldShowCreateMenuButton = this.checkDynamicURL();
    this.shouldShowUserProfileButton = !(this.router.url === '/');
    this.route.params.subscribe(params => {
      const restaurantID = params['restaurantID']; // Assuming 'restaurantID' is the parameter name in your route
      console.log("[LayoutComponent]: restaurantID: ", restaurantID); // Use the ID as needed in your component logic
      console.log("[LayoutComponent]: router.url: ", this.router.url.split('/')[2]);
    });
  }

  checkDynamicURL(): boolean {
    const restaurantID = this.router.url.split('/');
    if(restaurantID[2] && this.router.url.includes('menu') && restaurantID.length <= 3) {
      return true;
    }
    return false;
  }

  openCreateRestaurantDialog() {
    this.dialog.open(CreateRestaurantDialogComponent, {
      data: {
        title: 'Create a new restaurant',
      }
    });
  }

  openCreateMenuDialog() {
    this.dialog.open(CreateMenuDialogComponent, {
      data: {
        title: 'Create a new menu',
        // Pass the restaurant ID to the dialog from the URL
        restaurantID: this.router.url.split('/')[2]
      }
    });
  }

  checkIfOnLogin
}

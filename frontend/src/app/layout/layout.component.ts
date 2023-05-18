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
        restaurantID: "testID"
      }
    });
  }
}

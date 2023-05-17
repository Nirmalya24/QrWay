import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRestaurantDialogComponent } from '../create-restaurant-dialog/create-restaurant-dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  shouldShowCreateRestaurantButton = true;

  constructor(public dialog: MatDialog, private router: Router) {
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
  }

  openDialog() {
    this.dialog.open(CreateRestaurantDialogComponent, {
      data: {
        title: 'Create a new restaurant',
      }
    });
  }
}

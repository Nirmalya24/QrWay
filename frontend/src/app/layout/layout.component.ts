import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRestaurantDialogComponent } from '../create-restaurant-dialog/create-restaurant-dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreateRestaurantDialogComponent, {
      data: {
        title: 'Create a new restaurant',
      }
    });
  }
}

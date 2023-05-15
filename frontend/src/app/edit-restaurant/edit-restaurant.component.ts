import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { }


  openDeleteDialog():void {
    this.dialog.open(DialogBoxComponent);
  }


}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>) {}

  deleteRestaurant() {
    //TODO: add code for deleting a restaurant

    console.log("RESTAURANT DELETION TRIGGERED");
    this.dialogRef.close();
  }

  dontDeleteRestaurant() {

    this.dialogRef.close();
  }
}

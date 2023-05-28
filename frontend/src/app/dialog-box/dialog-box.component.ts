import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditRestaurantService } from '../services/edit-restaurant/edit-restaurant.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  restaurantID: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editRestaurantService: EditRestaurantService,
    private http: HttpClient,
    public router: Router
  ) {
    this.restaurantID = this.data.restaurantID;
  }

  ngOnInit(): void {
    this.restaurantID = this.data.restaurantID;
    console.log('[DialogBoxComponent] restaurantID: ${this.restaurantID}');
  }

  deleteRestaurant() {
    this.editRestaurantService.deleteRestaurant(this.restaurantID);
    this.dialogRef.close();
    this.router.navigate(['/dashboard']);
  }

  dontDeleteRestaurant() {

    this.dialogRef.close();
  }
}

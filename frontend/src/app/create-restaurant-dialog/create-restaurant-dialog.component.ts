import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateRestaurantService} from "../services/dashboard/create-restaurant.service";

@Component({
  selector: 'app-create-restaurant-dialog',
  templateUrl: './create-restaurant-dialog.component.html',
  styleUrls: ['./create-restaurant-dialog.component.css']
})

export class CreateRestaurantDialogComponent {
  addRestaurantForm: FormGroup;
  restaurantName: FormControl;
  description: FormControl;
  tag: FormControl;
  restaurantImage: FormControl;

  constructor(public dialogRef: MatDialogRef<CreateRestaurantDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private createRestaurantService: CreateRestaurantService) {

    this.restaurantName = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.tag = new FormControl('', Validators.required);
    this.restaurantImage = new FormControl('', Validators.required);

    this.addRestaurantForm = new FormGroup({
      restaurantName: this.restaurantName,
      description: this.description,
      tag: this.tag,
      restaurantImage: this.restaurantImage
    })
  }

  onSubmit() {
    if (this.addRestaurantForm.valid) {
      // Perform actions when the form is valid
      console.log(`[Add Restaurant Form] Sending ${JSON.stringify(this.addRestaurantForm.value)} to createRestaurantService`);
      this.createRestaurantService.createRestaurant(this.addRestaurantForm.value)
        .subscribe((response) => {
          console.log(`[Add Restaurant Form] Response from createRestaurantService: ${JSON.stringify(response)}`);
          this.dialogRef.close();
        }, error => {
          console.log(`[Add Restaurant Form] Error from createRestaurantService: ${JSON.stringify(error)}`);
          this.dialogRef.close();
        }
      );
    } else {
      // Display error messages for all fields
      this.addRestaurantForm.markAllAsTouched();
    }
  }
}

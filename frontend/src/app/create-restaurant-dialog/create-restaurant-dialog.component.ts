import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  imageUrl: FormControl;

  constructor(public dialogRef: MatDialogRef<CreateRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {

    this.restaurantName = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.tag = new FormControl('', Validators.required);
    this.imageUrl = new FormControl('', Validators.required);

    this.addRestaurantForm = new FormGroup({
      restaurantName: this.restaurantName,
      description: this.description,
      tag: this.tag,
      imageUrl: this.imageUrl
    })
  }

  onSubmit() {
    if (this.addRestaurantForm.valid) {
      // Perform actions when the form is valid
      console.log(`Dialog result: ${JSON.stringify(this.addRestaurantForm.value)}`);
    } else {
      // Display error messages for all fields
      this.addRestaurantForm.markAllAsTouched();
    }
  }
}

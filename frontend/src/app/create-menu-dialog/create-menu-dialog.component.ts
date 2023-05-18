import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../services/restaurant/menu.service';

@Component({
  selector: 'app-create-menu-dialog',
  templateUrl: './create-menu-dialog.component.html',
  styleUrls: ['./create-menu-dialog.component.css']
})
export class CreateMenuDialogComponent {

  restaurantID: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private menuService: MenuService) {


  }

  ngOnInit(): void {
    this.restaurantID = this.data.restaurantID;
    console.log(`[CreateMenuDialogComponent] restaurantID: ${this.restaurantID}`);
  }

  onSubmit() {
    console.log("[CreateMenuDialogComponent] onSubmit(): Deleting ", this.restaurantID);
  }

}

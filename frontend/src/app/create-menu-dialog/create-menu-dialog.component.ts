import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MenuService } from '../services/restaurant/menu.service';
import IMenuModelAngular from '../share/IMenuModelAngular';

@Component({
  selector: 'app-create-menu-dialog',
  templateUrl: './create-menu-dialog.component.html',
  styleUrls: ['./create-menu-dialog.component.css']
})
export class CreateMenuDialogComponent {

  menuForm: FormGroup;
  sendNewMenu: IMenuModelAngular;

  constructor(
    public dialogRef: MatDialogRef<CreateMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private menuService: MenuService) {
    this.sendNewMenu = {} as IMenuModelAngular;
    this.menuForm = this.fb.group({
      menuName: ['', Validators.required],
      menuDescription: [''],
      menuSections: this.fb.array([]),
      menuStartTime: ['', Validators.required],
      menuEndTime: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    console.log("[CreateMenuDialog] RestaurantID: ", this.data.restaurantID);
  }

  get menuSections(): FormArray {
    return this.menuForm.get('menuSections') as FormArray;
  }

  addMenuSection(): void {
    this.menuSections.push(this.fb.control(''));
  }

  removeMenuSection(index: number): void {
    this.menuSections.removeAt(index);
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      // Process the form data here
      this.sendNewMenu.menuName = this.menuForm.value.menuName;
      this.sendNewMenu.menuDescription = this.menuForm.value.menuDescription;
      // convert form's menuSection array to object with the array values are keys and empty array as values
      let menuSectionsObject: any = {};
      this.menuForm.value.menuSections.forEach((section: string) => {
        menuSectionsObject[section] = [];
        console.log("[CreateMenuDialog] section: ", section);
      });
      console.log("[CreateMenuDialog] menuSectionsObject: ", menuSectionsObject);
      this.sendNewMenu.menuSections = menuSectionsObject;
      this.sendNewMenu.menuStartTime = this.menuForm.value.menuStartTime;
      this.sendNewMenu.menuEndTime = this.menuForm.value.menuEndTime;
      this.sendNewMenu.restaurantID = this.data.restaurantID;
      // send form data to service
      this.menuService.createMenu(this.sendNewMenu).subscribe((data: object) => {
        console.log("[CreateMenuDialog] data: ", data);
        this.dialogRef.close();
      });
    }
  }

}

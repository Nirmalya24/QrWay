import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Dialog Title',
        message: 'This is the dialog message'
      }
    });
  }
}

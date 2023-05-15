import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewRestaurantComponent } from './viewRestaurant/view-restaurant/view-restaurant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { HomeComponent } from './home/home.component';
// import { DashboardRestaurantCardComponent } from './dashboard-restaurant-card/dashboard-restaurant-card.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ViewRestaurantComponent,
    ManageMenuComponent,
    LayoutComponent,
    RestaurantDashboardComponent,
    HomeComponent,
    EditRestaurantComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

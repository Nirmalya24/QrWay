import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewRestaurantComponent } from './viewRestaurant/view-restaurant/view-restaurant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewRestaurantComponent,
    ManageMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

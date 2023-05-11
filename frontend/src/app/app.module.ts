import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewRestaurantComponent } from './viewRestaurant/view-restaurant/view-restaurant.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ViewRestaurantComponent,
    ManageMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

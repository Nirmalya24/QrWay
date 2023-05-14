import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardRestaurantCardComponent } from './dashboard-restaurant-card/dashboard-restaurant-card.component';
import { DashboardService } from './services/dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    ManageMenuComponent,
    LayoutComponent,
    RestaurantDashboardComponent,
    HomeComponent,
    DashboardRestaurantCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [DashboardService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

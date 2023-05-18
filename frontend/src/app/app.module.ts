import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
// Services
import { DashboardService } from './services/dashboard/dashboard.service';
import {CreateRestaurantService} from "./services/dashboard/create-restaurant.service";
import { MenuService } from './services/restaurant/menu.service';
// Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateRestaurantDialogComponent } from './create-restaurant-dialog/create-restaurant-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
// Components
import { LayoutComponent } from './layout/layout.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardRestaurantCardComponent } from './dashboard-restaurant-card/dashboard-restaurant-card.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AllMenusComponent } from './all-menus/all-menus.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { CreateMenuDialogComponent } from './create-menu-dialog/create-menu-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ManageMenuComponent,
    LayoutComponent,
    RestaurantDashboardComponent,
    HomeComponent,
    DashboardRestaurantCardComponent,
    CreateRestaurantDialogComponent,
    EditRestaurantComponent,
    AllMenusComponent,
    MenuCardComponent,
    CreateMenuDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [DashboardService, CreateRestaurantService, MenuService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
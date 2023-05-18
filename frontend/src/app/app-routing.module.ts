import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { AppComponent } from './app.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { AllMenusComponent } from './all-menus/all-menus.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full' },
  {path: 'dashboard', component: RestaurantDashboardComponent, pathMatch: 'full' },
  {path: 'menus', component: ManageMenuComponent},
  {path:'restaurant/:restaurantID',component:EditRestaurantComponent},
  {path: 'menus/:restaurantID/:menuID', component: ManageMenuComponent, pathMatch: 'full'},
  {path:'restaurant',component:EditRestaurantComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }

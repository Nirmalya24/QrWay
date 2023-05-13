import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RestaurantDashboardComponent } from './restaurant-dashboard/restaurant-dashboard.component';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';
import { ViewRestaurantComponent } from './viewRestaurant/view-restaurant/view-restaurant.component';
import { AppComponent } from './app.component';
import { EditRestaurantComponent } from './editRestaurant/edit-restaurant/edit-restaurant.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'dashboard', component: RestaurantDashboardComponent, pathMatch: 'full' },
  //{path: 'viewRes', component: ViewRestaurantComponent},
  {path: 'menus', component: ManageMenuComponent},
  {path:'editRes',component:EditRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }

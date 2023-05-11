import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageMenuComponent } from './manageMenu/manage-menu/manage-menu.component';
import { ViewRestaurantComponent } from './viewRestaurant/view-restaurant/view-restaurant.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  //{path: 'viewRes', component: ViewRestaurantComponent},
  {path: 'menus', component: ManageMenuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import IMenuModelAngular from 'src/app/share/IMenuModelAngular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseURL: string = environment.apiUrl;
  private menu: any = {};

  constructor(private http: HttpClient) { }

  // Fetch all menus from backend for a specific restaurant
  public getAllMenus(restaurantID: string): any {
    return this.http.get<any>(`${this.baseURL}/menus/${restaurantID}`);
  }

  public getRestaurantName(restaurantID: string): Observable<string> {
    return this.http.get<any>(`${this.baseURL}/restaurant/${restaurantID}`)
      .pipe(map((restaurant: any) => restaurant.restaurantName));
  }

  setMenu(menu: any): void {
    this.menu = menu;
  }

  getMenu(): any {
    return this.menu;
  }

  public createMenu(menu: IMenuModelAngular): any {
    return this.http.post<any>(`${this.baseURL}/menus/create`, menu);
  }
}

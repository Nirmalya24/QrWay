import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import IMenuModelAngular from '../share/IMenuModelAngular';
import { MenuService } from '../services/restaurant/menu.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})

export class MenuCardComponent {
  @Input() menu!: any;

  constructor(private router: Router, private http: HttpClient, private menuService: MenuService) { 
    this.menu = {} as IMenuModelAngular;
  }

  ngOnInit(): void {
    console.log(`[MenuCardComponent] menu: ${JSON.stringify(this.menu)}`);
  }

  public redirectToMenu(restaurantID: string, menuID: string): any {
    this.menuService.setMenu(this.menu);
    this.router.navigate(['/menus', restaurantID, menuID]);
    console.log(`[MenuCardComponent] View button clicked: redirect to ${menuID}`);
  }
}

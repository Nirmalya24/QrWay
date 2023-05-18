import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import IMenuModelAngular from '../share/IMenuModelAngular';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})

export class MenuCardComponent {
  @Input() menu!: any;

  constructor(private router: Router, private http: HttpClient) { 
    this.menu = {} as IMenuModelAngular;
  }

  ngOnInit(): void {
    console.log(`[MenuCardComponent] menu: ${JSON.stringify(this.menu)}`);
  }

  public redirectToMenu(): any {
    // this.router.navigate(['/menu/:restaurantID/:menuID', menuID]);
    // console.log(`[MenuCardComponent] View button clicked: redirect to ${menuID}`);
  }
}

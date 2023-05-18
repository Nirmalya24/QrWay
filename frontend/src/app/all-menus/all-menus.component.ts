import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from '../services/restaurant/menu.service';

@Component({
  selector: 'app-all-menus',
  templateUrl: './all-menus.component.html',
  styleUrls: ['./all-menus.component.css']
})
export class AllMenusComponent {
  public restaurantID: string = '';
  public menus: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService
    ) { }

  ngOnInit() {
    this.restaurantID = this.route.snapshot.paramMap.get('restaurantID')?.toString() as string;
    console.log(`[AllMenusComponent] restaurantID: ${this.restaurantID}`);
    this.menuService.getAllMenus(this.restaurantID).subscribe((res: any) => {
      this.menus = res;
      console.log(res);
    });
    console.log(`[AllMenusComponent] menus: ${this.menus}`); 
  }
}

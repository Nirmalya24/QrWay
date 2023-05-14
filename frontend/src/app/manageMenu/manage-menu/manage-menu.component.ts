import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent {
  menu:any={
    menuID: '',
    restaurantID: '',
    menuName: '',
    menuItems: [],
    menuSections: Object,
    menuDescription: '',
    menuStartTime: '',
    menuEndTime: ''
  }
  
 // @Input() currentMenu = '';

}

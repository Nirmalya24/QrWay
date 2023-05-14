import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { restaurantModel } from 'src/app/share/restaurantModel';
import { menuModel } from 'src/app/share/menuModel';
import { HttpClient } from '@angular/common/http';
import { restaurantManagerModel } from 'src/app/share/restaurantManagerModel';
import { Router } from '@angular/router';
// ...



@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent {
  curRestaurant:restaurantModel
  //curRestaurantName:string="";
  msg:string="";
  //restaurant variable
  availableManager:any[]=[];
  selectedManager:any[]=[];
  managers:restaurantManagerModel[]=[];
  selectedManagers:restaurantManagerModel[]=[];
  availableManagers:restaurantManagerModel[]=[];

  //menu variable
  availableMenu:menuModel[]=[];
  selectedMenu:menuModel[]=[];
  menus:menuModel[]=[];
  selectedMenus:menuModel[]=[];
  availableMenus:menuModel[]=[];
  baseURL: string = 'http://localhost:8000/api';

  constructor(private route: ActivatedRoute,private http: HttpClient,private router: Router) {
    this.curRestaurant= new restaurantModel();
    console.log(this.curRestaurant.managerID)
    //this.getRestaurant();
    //this.getManagers();
   // this.getMeuns();
   }

   public addManager(filter:any):any{
    console.log(filter)
    if(filter.length==0) return;
    var idx =  this.availableManagers.map(e => e.managerName).indexOf(filter);
    const item = this.availableManagers[idx];
    console.log(item)
    this.availableManagers.splice(idx,1);
    this.selectedManagers.push(item);
    this.availableManager =[];
    this.selectedManager =[];
    console.log(this.selectedManagers);
  }

  public removeManager(filter:any):any{
    if(filter.length==0) return;
    var idx =  this.selectedManagers.map(e => e.managerName).indexOf(filter);
    const item = this.selectedManagers[idx];
    this.selectedManagers.splice(idx, 1);
    this.availableManagers.push(item);
    this.availableManager =[];
    this.selectedManager =[];
  }

  public addMenu(filter:any):any{
    console.log(filter)
    if(filter.length==0) return;
    var idx =  this.availableMenus.map(e => e.menuName).indexOf(filter);
    const item = this.availableMenus[idx];
    this.availableMenus.splice(idx,1);
    this.selectedMenus.push(item);
    this.availableMenu =[];
    this.selectedMenu =[];
  }

  public removeMenu(filter:any):any{
    if(filter.length==0) return;
    var idx =  this.selectedMenus.map(e => e.menuName).indexOf(filter);
    const item = this.selectedMenus[idx];
    this.selectedMenus.splice(idx, 1);
    this.availableMenus.push(item);
    this.availableMenu =[];
    this.selectedMenu =[];
  }

  public setAvailableManager(event:any):any{
    this.availableManager=event.target.value
  }
  public setSelectedManager(event:any):any{
    this.selectedManager= event.target.value
  }
  public setAvailableMenu(event:any):any{
    this.availableMenu=event.target.value
  }
  public setSelectedMenu(event:any):any{
    this.selectedMenu= event.target.value
  }
  public setRestaurantName(event:any):any{
    this.curRestaurant.restaurantName= event.target.value;
  //  console.log(this.curRestaurant.restaurantName);
  }


  public async getManagers():Promise<any> {
    console.log("this.curRestaurant.restaurantOwnerID:"+this.curRestaurant.restaurantOwnerID);
    this.http.get<any>(`${this.baseURL}/restaurantmanagers/${this.curRestaurant.restaurantOwnerID}`).subscribe(data => {
      this.managers= data;
      console.log("get managers from API"+this.managers);
      this.managers.map(manager=>{
          console.log("manager "+manager.userID);
          console.log(this.curRestaurant.managerID)
          console.log(this.curRestaurant.managerID.includes(manager.userID));
      // if(this.curRestaurant.managerID.indexOf(manager.userID)>0)
      //if(manager.restaurantID==this.curRestaurant.restaurantID)
      if(this.curRestaurant.managerID.includes(manager.userID))
          this.selectedManagers.push(manager)
      else //(manager.restaurantID=="")
          this.availableManagers.push(manager);
      })
  })
  }
  public async getMeuns():Promise<any> {
    console.log("get menus"+this.curRestaurant.restaurantID);
    this.http.get<any>(`${this.baseURL}/menus/${this.curRestaurant.restaurantID}`).subscribe(data => {
      this.menus= data;
      console.log("get managers from API"+this.managers);
      this.menus.map(menu=>{
          console.log("menu:"+menu.restaurantID)
        if(menu.restaurantID==this.curRestaurant.restaurantID)
          this.selectedMenus.push(menu)
        else if(menu.restaurantID=="")
            this.availableMenus.push(menu);
      })
  })
  }

  public  getRestaurant():any{
      /*
    
     this.http.get<restaurant>(`${this.baseURL}/restaurant/b061dffc-e85c-11ed-a05b-0242ac120003`).subscribe(data => {
      this.curRestaurant = data;
      console.log("current restautant"+this.curRestaurant.managerID);
    })
     *
    this.curRestaurant={
      "managerID": [
          "ancs1","ancs134"
      ],
      "menusID": [
          "b061e466-e85c-11ed-a05b-0242ac120003"
      ],
      "restaurantName": "Wingman's Pub",
      "restaurantID": "b061dffc-e85c-11ed-a05b-0242ac120003",
      "restaurantOwnerID": "d792c6be-e89c-11ed-a05b-0242ac120003"
  }
  */

  }

  public updateRestaurant():any{
    if(this.selectedManagers.length==0||this.selectedMenus.length==0){
    //  console.log(this.selectedMenu.length)
      alert('selected boxes must be not empty');
      return
    }

    this.setUpdateRestaurant();
    const headers ={'Content-Type':'application/json'}
    const result= this.http.post<restaurantModel>(`${this.baseURL}/updateRestaurant`,JSON.stringify(this.curRestaurant),{"headers":headers})
      .subscribe(isupdate=>{
          console.log(isupdate);
      })
  }

  public setUpdateRestaurant():void{
 

    this.curRestaurant.managerID.splice(0,this.curRestaurant.managerID.length);
    this.curRestaurant.menusID.splice(0,this.curRestaurant.menusID.length);
    var y = typeof this.curRestaurant.managerID; 
    console.log("y:"+y)

    this.selectedManagers.map(manager=>{
    this.curRestaurant.managerID.push(manager.userID);

    });
    this.selectedMenus.map(menu=>{
      this.curRestaurant.menusID.push(menu.menuID);
    });
    console.log("setSelectedManagerID:"+ this.curRestaurant.managerID);
    console.log("setselectedMenusID:"+ this.curRestaurant.menusID);
    this.router.navigate(['/dashboard']);
   // this.curRestaurant.managerID

  }

  clickEvent() {
    this.msg = "Button is Clicked";
    return this.msg;
  }
  

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   // this.getRestaurant();
    //this.getManagers();
    //  this.getMeuns();  
    
    this.route.params.subscribe(curRes => {

        console.log("curRes"+curRes['managerID'].split(",")[1] );
     
      this.curRestaurant.restaurantID=curRes['restaurantID'];
      this.curRestaurant.restaurantOwnerID=curRes['restaurantOwnerID'];
      this.curRestaurant.managerID=curRes['managerID'].split(",")
      this.curRestaurant.menusID=curRes['menusID'].split(",")
      this.curRestaurant.restaurantName=curRes['restaurantName'];
      //console.log("this.curRestaurant.restaurantID:"+this.curRestaurant.restaurantID)
      console.log("this.curRestaurant.managerID:"+this.curRestaurant.managerID)
      this.getManagers();
      this.getMeuns();  
      
      // use the ID to fetch the restaurant data from a data source
    });
    

  }
 
}

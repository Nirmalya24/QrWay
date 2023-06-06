import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  baseURL: string = environment.apiUrl;
  title = 'QrWay';
  restaurants:any[]=[];

  constructor(private http: HttpClient) {}

  ngOnInit(){}

}

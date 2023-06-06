import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserInfo(userID: string): any {
    console.log("[UserService] api url: ", this.apiUrl);
    let userData = this.http.get<any>(`${this.apiUrl}/user/${userID}`).subscribe(res => {
      console.log("[UserService] getUserInfo: ", res);
      return res;
    });
    console.log("User Data: ", userData);
    return userData;
  }
}

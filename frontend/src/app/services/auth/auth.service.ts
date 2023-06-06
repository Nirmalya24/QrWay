import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `http://localhost:8080`;

  constructor(private http: HttpClient) {}

  login(): Observable<any> {
    console.log("[AuthService] login()");
    let res = this.http.get<any>(`${this.apiUrl}/auth/google`);
    console.log(res);
    return res;
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, null);
  }

  fetchOAuthCredentials(): Observable<any> {
    console.log("[AuthService] fetchOAuthCredentials()");
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'});
    let res =  this.http.get<any>(`${this.apiUrl}/auth/google/callback`, {headers: headers});
    console.log(`[AuthService] OAuth Credentials: ${res}`);
    return res;
  }
}

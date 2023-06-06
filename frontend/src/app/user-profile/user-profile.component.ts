import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public user: any = {};
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {
    if (localStorage.getItem('userID') === null) {
      console.log("User is null");
      this.router.navigate(['/']);
    }
    this.user.name = localStorage.getItem('name')!;
    this.user.email = localStorage.getItem('email')!;
    this.user.profile_image = localStorage.getItem('profile_image')!;
    console.log("[UserProfile] User: ", this.user);   
  }

  ngOnInit() {
  }

  public handleLogout(): void {
    this.http.get(`${this.apiUrl}/logout`);
    console.log('[UserProfile] Logging out...');
    localStorage.clear();
    this.router.navigate(['/']); // Redirect to the homepage or any other desired page
  }
  

}

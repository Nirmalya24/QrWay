import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  public user: any = {};



  constructor(private userService: UserService) {
    this.user.name = localStorage.getItem('name')!;
    this.user.email = localStorage.getItem('email')!;
    this.user.profile_image = localStorage.getItem('profile_image')!;
    console.log("[UserProfile] User: ", this.user);   
  }

  ngOnInit() {
  }

}

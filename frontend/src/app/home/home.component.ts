import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
   }

  onLoginClick() {
    console.log("Login Clicked");
    this.authService.login().subscribe(
      (res) => {
        console.log("Login Response:", res);
        this.authService.fetchOAuthCredentials().subscribe(
          (res) => {
            console.log(res);
          });
      });

    this.router.navigate(['/dashboard']);
  }

}

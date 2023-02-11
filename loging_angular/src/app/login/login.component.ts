import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  username: string = '';
  password: string = '';
  
  constructor(private router: Router) { }
  onCreateAccount() {
    this.router.navigate(['/register']);
  }

  OnLogin() {
    this.router.navigate(['/testing']);
  }

}

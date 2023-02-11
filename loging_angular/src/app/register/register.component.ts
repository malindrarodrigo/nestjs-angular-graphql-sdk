import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username!:string;

onSignUp() {
throw new Error('Method not implemented.');
}
  constructor(private router:Router){}
onAlreadyHaveAccount() {
  this.router.navigate(['/login']);
}

}

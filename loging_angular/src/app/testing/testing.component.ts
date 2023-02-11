import { Component } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent {
  onRegister() {
alert("register working")

  }
  onLoging() {
    throw new Error('Method not implemented.');
  }

}

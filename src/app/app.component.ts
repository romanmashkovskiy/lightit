import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public userService: UserService) {

  }

  ngOnInit () {
    if (this.userService.isAuthenticated()) {
      this.userService.restoreUser();
    }
  }
}

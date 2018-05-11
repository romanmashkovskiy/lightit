import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css'],
  providers: [UserService]
})
export class SigninUserComponent implements OnInit {
  users: User[];
  signinSuccess: boolean = false;
  signinNotSuccess: boolean = false;

  constructor(private userService: UserService) { }

  signin(username: string, password: string): void {
    username = username.trim();
    password = password.trim();
    if (!username || !password) {
      return;
    }

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username && this.users[i].password == password) {
        this.signinSuccess = true;
        this.signinNotSuccess = false;
        return;
      }
      else {
        this.signinNotSuccess = true;
        this.signinSuccess = false;
      }
    }
   }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}

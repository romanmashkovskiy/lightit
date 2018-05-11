import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../user.service";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
  providers: [UserService]
})
export class RegisterUserComponent implements OnInit {
  users: User[];
  userExist: boolean;
  userAdded: boolean;

  constructor(private userService: UserService) { }

  register(username: string, password: string): void {
    username = username.trim();
    if (!username || !password) {
      return;
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username == username) {
        this.userExist = true;
        return;
      }
    }
    this.userService.addUser({username, password} as User)
      .subscribe(user => {
        this.users.push(user);
        this.userAdded = true;
        console.log(this.users);
      });

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

}

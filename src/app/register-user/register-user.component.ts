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


  constructor(private userService: UserService) { }

  registerUser (name: string, email: string, password: string): void {

    this.userService.registerUser({name, email, password} as User)
      .subscribe();
  }

  ngOnInit() {
 }
}

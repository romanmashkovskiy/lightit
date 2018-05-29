import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  user: User = new User();
  errorMessage = false;

  constructor(private userService: UserService) { }

  registerUser (name: string, email: string, password: string): void {
    this.userService.registerUser({name, email, password} as User)
      .subscribe(data => {if (data.success) {
        this.userService.setSession(data);
        } else {
        this.errorMessage = true;
      }
      });
  }



  ngOnInit() {}

}

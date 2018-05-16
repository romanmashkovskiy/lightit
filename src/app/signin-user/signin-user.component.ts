import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  user: User = new User();

  constructor(private userService: UserService,
              private router: Router) { }

  loginUser(email: string, password: string): void {
    this.userService.loginUser({email, password} as User)
      .subscribe(data => {if (data.success) {
        this.userService.setSession(data);
        this.goProducts();
        }
      });
  }

  goProducts(){
    this.router.navigate(['products']);
  }

  ngOnInit() {}

}

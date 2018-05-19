import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import {User} from "./models/user";
import {Authentication} from "./models/authentication";
import {Router} from "@angular/router";
import {CurrentUser} from "./models/current-user";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UserService {

  private userRegisterUrl = 'http://localhost:3001/auth/registration';
  private userLoginUrl= 'http://localhost:3001/auth/login';

  authResult: Authentication;
  currentUser: CurrentUser;

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private router: Router) { }

  registerUser (user: User): Observable<Authentication> {
    return this.http.post<Authentication>(this.userRegisterUrl, user, httpOptions).pipe(
      tap(data => { this.authResult = data; }),
      catchError(this.handleError<Authentication>('addUser',{success: false, access_token: undefined}))
    );
  }

  loginUser (user: User): Observable<Authentication> {
    return this.http.post<Authentication>(this.userLoginUrl, user, httpOptions).pipe(
      tap(data => { this.authResult = data; }),
      catchError(this.handleError<Authentication>('loginUser', {success: false, access_token: undefined}))
    );
  }

  public setSession(authResult): void {
    this.currentUser = this.parseJwt(authResult.access_token);
    const expiresAt = JSON.stringify(this.currentUser.exp * 1000 );
    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('expires_at', expiresAt);
    this.router.navigate(['products']);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['products']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public restoreUser() {
    const accessToken: String = localStorage.getItem('access_token');
    this.currentUser = this.parseJwt(accessToken);
  }

  private parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';
import {User} from "./models/user";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class UserService {
  private usersUrl = 'http://localhost:3001/api/users';
  private userRegisterUrl = 'http://localhost:3001/auth/registration';
  private userLoginUrl= 'http://localhost:3001/auth/login';

  currentUser: User;

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError('getUsers', []))
      );
  }

  registerUser (user: User): Observable<User> {
    return this.http.post<User>(this.userRegisterUrl, user, httpOptions).pipe(
      tap(data => { this.currentUser = data; console.log(this.currentUser)}),
      catchError(this.handleError<User>('addUser'))
    );
  }

  loginUser (user: User): Observable<User> {
    return this.http.post<User>(this.userLoginUrl, user, httpOptions).pipe(
      tap(data => { this.currentUser = data; console.log(this.currentUser)}),
      catchError(this.handleError<User>('loginUser'))
    );
  }


}

import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Review} from "./models/review";
import {UserService} from "./user.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ReviewService {
  private reviewsUrl = 'http://localhost:3001/protected/reviews';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  getReviews(id_entry: number): Observable<Review[]> {
    console.log(httpOptions);
    return this.http.get<Review[]>(`${this.reviewsUrl}/${id_entry}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    }
    )
      .pipe(
      catchError(this.handleError<Review[]>('getReviews', []))
    );
  }

  addReview(review: Review): Observable<Review> {

    return this.http.post<Review>(this.reviewsUrl, review, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('access_token')}`)
    }).pipe(
      catchError(this.handleError<Review>('addReview'))
    );
  }


}

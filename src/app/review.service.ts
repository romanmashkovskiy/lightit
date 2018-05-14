import { Injectable } from '@angular/core';
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Product} from "./models/product";
import {Review} from "./models/review";

@Injectable()
export class ReviewService {
  private productsUrl = 'http://localhost:3001/api/reviews';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getReviews(id: number): Observable<Review[]> {

    return this.http.get<Review[]>(`http://localhost:3001/api/reviews/?id_entry=${id}`).pipe(
      catchError(this.handleError<Review[]>('getReviews', []))
    );
  }


}

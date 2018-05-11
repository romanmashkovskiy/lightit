import { Injectable } from '@angular/core';
import {Product} from "./models/product";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {HttpClient} from "@angular/common/http";
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ProductService {
  private productsUrl = 'api/products';  // URL to web api

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

}

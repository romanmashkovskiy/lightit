import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {Review} from "../models/review";
import {ReviewService} from "../review.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService, ReviewService]
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  reviews: Review[];
  review: Review = new Review();


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private reviewService: ReviewService,
    public userService: UserService
  ) {
  }

  ngOnInit() {
    this.getProduct();

  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
    this.getReviews(id);
  }

  getReviews(id: number): void {
    this.reviewService.getReviews(id)
      .subscribe(reviews => this.reviews = reviews);

  }

  addReview(rate: number, text: string): void {
    const id_user = this.userService.currentUser.id;
    const id_entry = +this.route.snapshot.paramMap.get('id');
    this.reviewService.addReview({rate, text, id_user, id_entry } as Review).subscribe(review => {
      this.reviews.push(review);
    });

  }




}

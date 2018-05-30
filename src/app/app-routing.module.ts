import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {SigninUserComponent} from './signin-user/signin-user.component';

const routes: Routes = [
  { path: 'detail/:id', component: ProductDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'register', component: RegisterUserComponent },
  { path: 'signin', component: SigninUserComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

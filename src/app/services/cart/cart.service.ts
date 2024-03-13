import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = [];
  public productList$ = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts(): Observable<any> {
    const products = localStorage.getItem('products');
    if (products) {
      this.cartItemList = JSON.parse(products);
      this.productList$.next(this.cartItemList);
    }
    return this.productList$.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push({ ...product });
    this.productList$.next(product);
  }

  addtoCart(product: any) {
    this.cartItemList.push({ ...product });
    this.productList$.next(this.cartItemList);
  }

  getTotalPrice(): number {
    return this.cartItemList.map((item:any) => item.total)
    .reduce((acc:any,cur:any) => acc + cur, 0);
  }

  removeCartItem(product: any) {
    const index = this.cartItemList.findIndex((item:any) => item.id === product.id);
    this.cartItemList.splice(index, 1);
    this.productList$.next(this.cartItemList);
  }

  removeAll() {
    this.cartItemList = [];
    this.productList$.next(this.cartItemList);
  }
}

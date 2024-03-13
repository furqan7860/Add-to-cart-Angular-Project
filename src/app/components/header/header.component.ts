import { Component, OnInit, OnDestroy,OnChanges,DoCheck, SimpleChange } from '@angular/core';
import { BehaviorService } from 'src/app/services/data/behavior.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'add-to-cart-master/src/app/service/api.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public value = '';
  public totalItems: number = 0;
  public totalValues!: number
  subscription?: Subscription;
  public productTitle: string[] = [];

  public data!: any;
  isLogin:boolean=false;
  constructor(private router: Router, private cartService: CartService, private apiService: ApiService, private dataService: BehaviorService, private localService: LocalService) {
  }
  get cartItems(): number {
    return this.localService.get('cartItems')?.length
  }

  get isloggedIn () {
    return JSON.parse(localStorage.getItem('isAuthenticated') ?? 'false')
  }
  
  ngOnInit(): void {   
    this.subscription = this.apiService.getProduct().subscribe({
      next: (res) => {
        this.productTitle = res.map((list: any) => {
          return list?.title
        }).filter((title: any) => title);
      }
    });
  
  
    this.totalItems = this.localService.get("local");
    if (this.totalItems) {
      this.subscription = this.cartService.getProducts().subscribe(res => this.localService.set("local", this.totalValues = this.totalItems + res.length));
    }
    else {

      this.subscription = this.cartService.getProducts().subscribe(res => this.localService.set("local", this.totalItems = res.length));
    }

  }

  setData() {
    this.data = localStorage.getItem("isAuthenticated");
    if (this.data) {
      this.data = JSON.parse(this.data);
      this.dataService.setData(this.value);
    }
    else {
      alert("Sorry Log In Again!");
      
    }
  }

  clearSearchFilter() {
    this.value = "";
    this.dataService.setData("");
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

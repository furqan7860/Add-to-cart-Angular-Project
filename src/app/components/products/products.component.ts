import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { BehaviorService } from 'src/app/services/data/behavior.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

interface DropdownI {
  label: string;
  value: any
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  public productList: any;
  public productTitle: string[] = [];
  public searchText: any;
  public cartItems: any[] = [];
  public subscription?: Subscription;

  radioValue!: string;
  constructor(private apiService: ApiService, private cartService: CartService, private dataService: BehaviorService) {

  }

  priceArray: string[] = ['Default', 'High to low', 'low to high'];
  alphabetArray: string[] = ['Price', 'Alphabetically'];
  dummyArray: DropdownI[] = [];
  alphabetDropdown: string[] = ['Default', 'A to Z', 'Z to A'];


  priceSortArray: DropdownI[] = [
    {
      label: 'High to Low',
      value: 'highToLow'
    },
    {
      label: 'Low to High',
      value: 'lowToHigh'
    },
  ];


  alphatSortArr: DropdownI[] = [
    {
      label: 'A to Z',
      value: 'aToz'
    },
    {
      label: 'Z to A',
      value: 'zToa'
    },

  ]


  ngOnInit(): void {

    this.subscription = this.apiService.getProduct().subscribe({
      next: (res) => {
        this.productList = res;
        this.productTitle = this.productList.map((list: any) => {
          return list.title;
        })
      }
    });
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartItems = JSON.parse(cartItems);
    }
    // this.apiService.getProduct().subscribe(res => {
    //   this.productList = res;
    //   this.productList.forEach((a: any) => {
    //     Object.assign(a, { quantity: 1, total: a.price });
    //   });
    // })

    this.dataService.getData().subscribe({
      next: (res) => {
        console.log('res: ', res);
        this.searchText = res;
      }
    })

  }



  addtocart(item: any) {
    const duplicate = this.cartItems.findIndex(product => product.id == item.id);
    if (duplicate != -1) {
      console.log('duplicate', duplicate)
      this.cartItems[duplicate].quantity += 1;
      console.log('this.cartItems[duplicate]: ', this.cartItems[duplicate]);
    }
    else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    // this.cartService.addtoCart(item);
  }


  default() {
    this.subscription = this.apiService.getProduct().subscribe({
      next: (res) => {
        this.productList = res;
      }
    })
  }



  priceSorting(value: string) {
    switch (value) {
      case "highToLow":
        this.productList.sort((a: any, b: any) => { return b.price - a.price })
        console.log('this.productList', this.productList)
        break;
      case "lowToHigh":
        this.productList.sort((a: any, b: any) => { return a.price - b.price })
        console.log('this.productList', this.productList)
        break;

    }

  }


  alphabeticalSort(value: string) {
    switch (value) {
      case "aToz":
        this.productList.sort((a: any, b: any) => { return a.title.localeCompare(b.title) })
        break;
      case "zToa":
        this.productList.sort((a: any, b: any) => { return b.title.localeCompare(a.title) })
        break;

    }
  }



  sortDescending() {
    this.productList.sort((a: any, b: any) => { return b.title.localeCompare(a.title) })
    console.log('this.productList', this.productList)
  }

  onChange(obj: any) {
    console.log("obj.value", obj.value)
    this.priceSorting(obj.value);
    this.alphabeticalSort(obj.value)

  }


  radioChange(event: any) {
    console.log('event.value', event.value)

    if (event.value == "Price") {
      this.dummyArray = this.priceSortArray;
      this.default();
    }
    if (event.value == "Alphabetically") {
      this.dummyArray = this.alphatSortArr;
      this.default();
    }
  }
  selected = 'Default'

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

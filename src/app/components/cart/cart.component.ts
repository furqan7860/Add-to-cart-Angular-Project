import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorService } from 'src/app/services/data/behavior.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public products: any = [];
  public cartItems: any[] = [];
  public grandTotal: number = 0;
  public searchText: any;
  public subscription?: Subscription;
  parentMessage = "message from parent";
  constructor(public dialog: MatDialog, private cartService: CartService, private behavior: BehaviorService, private localService: LocalService) {
  }

  get totalPrice(): number {
    return this.cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }


  ngOnInit(): void {
    this.grandTotal = this.cartService.getTotalPrice();
    this.cartItems = this.localService.get('cartItems') ?? [];

    // const localProductData=this.localService.get("products");
    // const localTotalData=this.localService.get("total");

    // if(localProductData && localTotalData)
    // {
    // this.products=localProductData;
    // this.grandTotal=localTotalData;

    // this.cartService.getProducts().subscribe({
    //   next : (res)=>
    //   {
    //     this
    //     this.grandTotal+=this.cartService.getTotalPrice();
    //     this.localService.set("total",this.grandTotal);

    //   }
    // })
    // }
    // else
    // {

    // this.cartService.getProducts().subscribe({
    //   next: (res) => {
    //     this.products = res;
    //     this.grandTotal = this.cartService.getTotalPrice();

    //     this.localService.set("products",this.products);
    //     this.localService.set("total",this.grandTotal);
    //   }

    // });
    // }

    this.subscription = this.behavior.getData().subscribe({
      next: (res) => {
        this.searchText = res;
      }

    });
  }

  openDialog(image: any) {
    this.dialog.open(DialogComponent,
      {
        width: '600px',
        height: '500px',
        data: {
          image:image
        }
      });
  }

  removeItem(item: any) {


    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        record: item.title,
        cancelBtn: "Cancel",
        deleteBtn: 'Delete'
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          // this.localValue.data = this.localValue.data.filter((item: any, index: any) => index !== index1);
          // this.service.set("local", this.localValue.data);
          this.cartItems = this.cartItems.filter((product) => product.id != item.id);
          this.localService.set('cartItems', this.cartItems);
        }
      }
    })
    
    // this.cartService.removeCartItem(item);
  }

  emptycart() {

    this.cartItems = []
    this.localService.remove("cartItems");
  }


  addQuantity(item: any) {
    item.quantity += 1
    this.localService.set("cartItems", this.cartItems)
  }

  subQuantity(item: any) {
    if (item.quantity != 0) {
      item.quantity -= 1
    }
    if (item.quantity == 0) {
      this.cartItems = this.cartItems.filter((product) => product.id != item.id);
    }
    this.localService.set("cartItems", this.cartItems);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

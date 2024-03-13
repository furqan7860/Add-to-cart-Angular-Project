import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(private toastr:ToastrService){}

  @Input() item: any;
  @Output() cartItem: EventEmitter<any> = new EventEmitter()

  successmsg(){  
    this.toastr.success("Added to cart Successfully!!")
}  


  addtocart(item: any) {
    this.cartItem.emit(item);
    this.successmsg();

  }

}

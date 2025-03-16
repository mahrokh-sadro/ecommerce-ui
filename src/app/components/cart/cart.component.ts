import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';  
import { RouterModule } from '@angular/router'; 

import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../../order-summary/order-summary.component'; 
@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    OrderSummaryComponent  
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService=inject(CartService);
  
  ngOnInit(){

  }

  removeItem(item:any){
     this.cartService.removeItemFromCart(item)?.subscribe();
  }

  increment(item:any){
     this.cartService?.increamentItem(item)?.subscribe();
  }

  decrement(item:any){
     this.cartService.decreaseItemQuantity(item)?.subscribe();
  }


}

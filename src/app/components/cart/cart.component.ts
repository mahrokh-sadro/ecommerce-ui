import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';  
import { RouterModule } from '@angular/router'; 

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService=inject(CartService);
  
  ngOnInit(){

  }

  removeItem(item:any){
     this.cartService.removeItemFromCart(item);
  }

  increment(item:any){
     this.cartService.increamentItem(item);
  }

  decrement(item:any){
     this.cartService.decreaseItemQuantity(item);
  }
}

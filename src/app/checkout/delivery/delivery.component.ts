import { Component, inject } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckoutService } from '../../checkout.service';
import { DeliveryMethod } from '../../models/DeliveryMethod';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-delivery',
  imports: [
    MatRadioModule,
    CommonModule,
    FormsModule  
  ],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {
  checkoutService=inject(CheckoutService);
  cartService=inject(CartService);

  ngOnInit(){
    this.checkoutService.getDeliveryMethods().subscribe({
      next: methods => {
        if (this.cartService.cart()?.deliveryMethodId) {
          const method = methods.find(x => x.id === this.cartService.cart()?.deliveryMethodId);
          if (method) {
            this.cartService.selectedDeliveryMethod.set(method);
            console.log('selectedDeliveryMethod',this.cartService.selectedDeliveryMethod())
          }
        }
      }
    }); 
  }

  async updateDeliveryMethod(method: DeliveryMethod) {
    this.cartService.selectedDeliveryMethod.set(method);
    const cart = this.cartService.cart();
    if (cart) {
      cart.deliveryMethodId = method.id;
      this.cartService.setCart(cart);
    }
  }
}

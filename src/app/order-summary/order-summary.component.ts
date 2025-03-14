import { Component, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  standalone: true,

})
export class OrderSummaryComponent {
   
    cartService=inject(CartService);
  
}

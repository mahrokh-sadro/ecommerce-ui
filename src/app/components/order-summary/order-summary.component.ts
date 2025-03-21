import { Component, inject } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { Location } from '@angular/common';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  imports: [RouterModule ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
  standalone: true,

})
export class OrderSummaryComponent {
    cartService=inject(CartService);
    location=inject(Location);

}

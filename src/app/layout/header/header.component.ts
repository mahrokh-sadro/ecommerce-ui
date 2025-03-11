import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   private cartService=inject(CartService);

   getCartItems(){
     return this.cartService.totalCartItems();
   }
}

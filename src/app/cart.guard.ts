import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './services/cart.service';

export const cartGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);
  const router = inject(Router);

  // Accessing the cart signal
  const cart = cartService.cart(); // Assume cart() is a signal

  // Assuming `cart` signal contains an object with an `items` array
  if (!cart || cartService.totalCartItems() === 0) {
    router.navigate(['/cart']); // Redirect to cart page if empty
    return false;
  }

  return true;
};

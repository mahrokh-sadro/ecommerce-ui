import { Injectable,inject } from '@angular/core';
import { CartService } from './cart.service';
import { forkJoin, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private cartService=inject(CartService);
  private userService=inject(UserService);

  init(){
    const cartId=localStorage.getItem("cartId");
    const cart$=cartId? this.cartService.getCart(cartId):of(null);

    return forkJoin({
      cart:cart$,
      user:this.userService.getUserInfo()
    })
  }
}

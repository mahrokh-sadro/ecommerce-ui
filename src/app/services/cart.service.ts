import { inject,Injectable ,signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nanoid } from 'nanoid';

import { environment } from '../../environments/environment';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart';

import {Product} from '../models/product'
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl=environment.apiUrl;
  private http=inject(HttpClient);
  cart=signal<Cart| null>(null);
  totalCartItems=computed(()=>{
    return this.cart()?.cartItems?.reduce((total,item)=>total+item.quantity,0) || 0;
  })

  constructor() {
  }

  getCart(id:string){
    return this.http.get<Cart>("http://localhost:5001/api/cart/"+id).pipe(
      map((cart:any)=>{
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart:Cart){
    return this.http.post<Cart>("http://localhost:5001/api/cart",cart).subscribe({
      next:data=>{
        this.cart.set(data);
      },
      error:()=>{}
    })
  }

  addItemToCart(product:Product,quantity:number=1){
    const cart = this.cart() ?? this.createCart();
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==product.id);
    if(index!=-1){
      cart.cartItems[index].quantity += quantity
    }
    else{
      const newItem=this.mapProductToItem(product,quantity,cart.id) ;
      cart.cartItems?.push(newItem);
    }
    this.setCart(cart);
  }

  createCart(){
    const newCart= {
      id:nanoid(),
      cartItems:[]
    }
    localStorage.setItem('cartId',newCart.id);
    return newCart;
  }

  mapProductToItem(product:Product,quantity:number,cartId:string){
    return{
      shoppingCartId:cartId, //nanoid
      productId:product.id,
      quantity:quantity,
      name:product.name,
      description:product.description,
      price:product.price,
      image:product.image,
    }
  }

  decreaseItemQuantity(cartItem:CartItem){
     const cart=this.cart();
     if(!cart){
      return;
     }
     const index=cart.cartItems?.findIndex((item:any)=>item.productId==cartItem.productId);
     if(index!=-1){
       cart.cartItems[index].quantity-=1; 
     }
     this.setCart(cart);
  }

  removeItemFromCart(cartItem:CartItem){
    const cart=this.cart();
    if(!cart){
      return;
    }
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==cartItem.productId);
    console.log(index)
    if(index!=-1){
      cart.cartItems.splice(index,1);
    }
    this.setCart(cart);
  }

  increamentItem(cartItem:CartItem){
    const cart = this.cart();
    if(!cart) return;
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==cartItem.productId);
    if(index!=-1){
      cart.cartItems[index].quantity += 1
    }
    this.setCart(cart);
  }

    // deleteCart() {
  //   this.http.delete(this.baseUrl  + 'cart?id=' + this.cart()?.id).subscribe({
  //     next: () => {
  //       localStorage.removeItem('cart_id');
  //       this.cart.set(null);
  //     }
  //   })
  // }
}



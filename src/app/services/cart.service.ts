import { inject,Injectable ,signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { nanoid } from 'nanoid';

import { environment } from '../../environments/environment';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart';

import {Product} from '../models/product'
import { map, tap } from 'rxjs';
import { DeliveryMethod } from '../models/DeliveryMethod';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  baseUrl= environment.apiUrl;
  private http=inject(HttpClient);
  cart=signal<Cart| null>(null);
  totalCartItems=computed(()=>{
    return this.cart()?.cartItems?.reduce((total,item)=>total+item.quantity,0) || 0;
  })
  taxRate:number = 0.13;
  discount:number=0;
  selectedDeliveryMethod=signal<DeliveryMethod| null>(null);
  orderSummary=computed(()=>{
    const cart=this.cart();
    const deliveryMethod=this.selectedDeliveryMethod();
    if (!cart) {
      return { subTotal: 0, tax: 0, shipping: 0, total: 0 };
    }
    let subTotal = cart.cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0;
    let tax = subTotal * this.taxRate;
    const shipping= deliveryMethod? deliveryMethod?.shippingPrice:10;
    return{
      subTotal,
      tax,
      shipping: shipping,
      discount:this.discount,
      total:subTotal + tax + shipping
    }
  })

  constructor() {
  }

  getCart(id:string){
    return this.http.get<Cart>(this.baseUrl + "cart/"+id).pipe(
      map((cart:any)=>{
        this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart: Cart) {
    return this.http.post<Cart>(this.baseUrl + "cart", cart).pipe(
      tap(data => {
        console.log('set',data)
        this.cart.set(data);
      })
    );
  }
  
  addItemToCart(product:Product,quantity:number=1){
    const cart = (this.cart() ?? this.createCart()) as Cart;
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==product.id);
    if(index!=-1){
      cart.cartItems[index].quantity += quantity
    }
    else{
      const newItem=this.mapProductToItem(product,quantity,cart.id) ;
      if( !cart.cartItems ) cart.cartItems = [];
      cart.cartItems?.push(newItem);
    }
    return this.setCart(cart);
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
     return this.setCart(cart);
  }

  removeItemFromCart(cartItem:CartItem){
    const cart=this.cart();
    if(!cart){
      return;
    }
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==cartItem.productId);
    if(index!=-1){
      cart.cartItems.splice(index,1);
    }
    return this.setCart(cart);
  }

  increamentItem(cartItem:CartItem){
    const cart = this.cart();
    if(!cart) return;
    const index=cart.cartItems?.findIndex((item:any)=>item.productId==cartItem.productId);
    if(index!=-1){
      cart.cartItems[index].quantity += 1
    }
    return this.setCart(cart);
  }

  deleteCart() {
    this.http.delete(this.baseUrl + 'cart/' + this.cart()?.id).subscribe({
      next: () => {
        localStorage.removeItem('cartId');
        this.cart.set(null);
      }
    })
  }
 
}



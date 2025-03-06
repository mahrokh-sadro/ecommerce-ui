import { inject,Injectable ,signal} from '@angular/core';
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

  constructor() {
    // this.loadCart();
  }
 
  loadCart() {
    const cartId=localStorage.getItem('cartId');
    console.log('cartId',cartId)
    if(cartId){
       this.getCart(cartId);
    }
    else{
       //do we need to create??
    }
  }
  
  getCart(id:string){
    return this.http.get<Cart>(this.baseUrl+"cart/"+id).pipe(
      map((cart:any)=>{
        // this.cart.set(cart);
        return cart;
      })
    )
  }

  setCart(cart:Cart){
    return this.http.post<Cart>("http://localhost:5001/api/cart",cart).subscribe({
      next:data=>{
        // this.cart.set(data);
        localStorage.setItem('cartId',cart.id);
      },
      error:()=>{}
    })
  }

  addItemToCart(product:Product,quantity:number=1){
      let cart=this.cart();
      if (!cart || typeof cart !== 'object') {
        cart = this.createCart();
      }
      console.log('cart before update:', cart);
      if (!cart.cartItems) {
        cart.cartItems = [];
      }
      const existingItem=cart.cartItems?.find((item:any)=>item.productId==product.id);
      if(existingItem){
        existingItem.quantity+=quantity; 
      }
      else{
        const newItem=this.mapProductToItem(product,quantity,cart.id) ;
        cart.cartItems?.push(newItem);
      }
      console.log(cart)
      this.setCart(cart);

  }

  createCart(){
    return {
      id:nanoid(),
      cartItems:[]
    }
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
}



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
      let cart=this.cart();
      console.log('cart before update:', cart);
      console.log('cartId',  localStorage.getItem('cartId'));
      const cartId=localStorage.getItem('cartId');
      if (!cart || typeof cart !== 'object' && ((cartId==null || cartId==""))) {
        cart = this.createCart();
      }
      if (!cart.cartItems) {
        cart.cartItems = [];
      }
      console.log('cartId',  localStorage.getItem('cartId'));
      const index=cart.cartItems?.findIndex((item:any)=>item.productId==product.id);
      if(index>0){
        cart.cartItems[index].quantity += quantity
      }
      else{
        const newItem=this.mapProductToItem(product,quantity,cart.id) ;
        cart.cartItems?.push(newItem);
      }
      console.log(cart)
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
}



import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import this
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';  

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-details',
  imports: [
    MatButton,
    MatCard,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule ,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
    private route=inject(ActivatedRoute);
    private productService=inject(ProductService);
    productId:string | null="";
    product:any;
    quantity:number=1;
    cartService=inject(CartService);
    
    constructor(){
       console.log('ccc',this.cartService.cart())
    }

    ngOnInit(){
      this.productId=this.route.snapshot.paramMap.get('id');
      if(this.productId){
        this.productService.getProductById(+this.productId).subscribe({
           next:(data:any)=>{
             this.product=data;
           }
        })
      }
    }

    increment(){
        this.quantity++;
    }
 
    decrement(){
      this.quantity--;
    }

    addToCart(product: Product, quantity: number) {
      this.cartService.addItemToCart(product, quantity).subscribe(
        (response) => {
          console.log('Item added to cart successfully', response);
          // Additional logic after the cart is updated
        },
        (error) => {
          console.error('Error adding item to cart', error);
          // Handle error if necessary
        }
      );
    }
    
}

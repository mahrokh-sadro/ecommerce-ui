import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatButton} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';  

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { LoadingIconComponent } from '../../loading-icon/loading-icon.component';

@Component({
  selector: 'app-product-details',
  imports: [
    MatButton,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule ,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    LoadingIconComponent
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
    isLoading:boolean = false;

    constructor(){
    }

    ngOnInit(){
      this.isLoading=true;
      this.productId=this.route.snapshot.paramMap.get('id');
      if(this.productId){
        this.productService.getProductById(+this.productId).subscribe({
           next:(data:any)=>{
             this.product=data;
             this.isLoading=false;
           },
           error: (err)=>{
            console.log(err);
            this.isLoading=false;
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

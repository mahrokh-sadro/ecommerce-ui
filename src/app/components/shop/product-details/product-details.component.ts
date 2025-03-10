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

import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [
    MatButton,
    MatCard,
    MatCardModule,
    MatIcon,
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule ,
    MatButtonToggleModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
    private route=inject(ActivatedRoute);
    private productService=inject(ProductService);
    productId:string | null="";
    product:any;
    quantityOptions:number[]=[];
    cartService=inject(CartService);
    selectedQuantity = 1;
    
    constructor(){
      for(let i=0;i<30;i++){
        this.quantityOptions[i]=i+1;
      }
    }

    ngOnInit(){
      this.productId=this.route.snapshot.paramMap.get('id');
      // console.log('productId',this.productId);
      if(this.productId){
        this.productService.getProductById(+this.productId).subscribe({
           next:(data:any)=>{
             this.product=data;
            //  console.log(this.product)
           }
        })
      }
    }

    
}

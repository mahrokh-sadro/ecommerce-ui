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


import { ProductService } from '../../../services/product.service';

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
    MatButtonToggleModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
    private route=inject(ActivatedRoute);
    private productService=inject(ProductService);
    productId:string | null="";
    product:any;

    ngOnInit(){
      this.productId=this.route.snapshot.paramMap.get('id');
      console.log('productId',this.productId);
      if(this.productId){
        this.productService.getProductById(+this.productId).subscribe({
           next:(data:any)=>{
             this.product=data;
             console.log(this.product)
           }
        })
      }
    }

    quantity = 1;

    increaseQuantity() {
      this.quantity++;
    }

    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
}

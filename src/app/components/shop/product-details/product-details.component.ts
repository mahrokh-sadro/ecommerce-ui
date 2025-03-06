import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import { CommonModule } from '@angular/common';


import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-details',
  imports: [
    MatButton,
    MatCard,
    MatCardModule,
    MatIcon,
    CommonModule
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
}

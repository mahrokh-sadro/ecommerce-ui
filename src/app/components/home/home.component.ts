import { Component, inject } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-home',
  imports: [
    SlickCarouselModule,
    CommonModule,
    NgFor ,
    MatButtonModule,
    RouterLink,
    
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  products:Product[]=[];
  bestSeller:Product[]=[];
  featured:Product[]=[];
  isLoading:boolean=false;
  private productService=inject(ProductService);
  types:string[]=[];
  private router=inject(Router);
  private location=inject(Location);

  ngOnInit() {
    this.getProducts();
    this.getTypes();
  }

  getProducts(){
    this.isLoading=true;
    this.productService.getProducts().subscribe({
      next:(data:any)=>{
        this.products=data;
        this.bestSeller=this.products.filter(p=>p.isBestSeller);
        this.featured=this.products.filter(p=>p.isFeatured);
        console.log('bestSeller',this.bestSeller);
        console.log('featured',this.featured);
        this.isLoading=false;
      },
      error:(error:any)=>{
        console.log(error);
        this.isLoading=false;
      }
    })
  }


  banners = [
    { image: 'images/banner1.jpg', name: 'Tech Product 1', description: 'This is a description of product 1' },
    { image: 'images/banner2.jpg', name: 'Tech Product 2', description: 'This is a description of product 2' },
    { image: 'images/banner3.jpg', name: 'Tech Product 3', description: 'This is a description of product 3' }
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,   
    infinite: true,
    adaptiveHeight: true
  };
  
  // Slick carousel config for categories
  categoryCarouselConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    infinite: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  typeCarouselConfig = {
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    arrows: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  getTypes() {
    this.productService.getTypes()?.subscribe({
      next:(data:any)=>{
        this.types=data.map((type:string)=>type.toLowerCase());
      },
    })
  }

  redirectToCategory(category:string){
    this.router.navigateByUrl(`/products?category=${category}`);
  }
}

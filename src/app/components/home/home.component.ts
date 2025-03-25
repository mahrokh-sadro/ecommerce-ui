import { Component } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CommonModule, NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [
    SlickCarouselModule,
    CommonModule,
    NgFor ,
    MatButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
    arrows: true,   // Show arrows for navigation
    infinite: true,
    adaptiveHeight: true
  };
  

  featured1 = [
    { name: 'furniture', image: 'images/b1.jpg' },
    { name: 'headphone', image: 'images/b2.jpg' },
    { name: 'kids', image: 'images/b3.jpg' },
    { name: 'earrings', image: 'images/b4.jpg' },
    { name: 'bath', image: 'images/b5.jpg' },
    { name: 'kitchen', image: 'images/b6.jpg' },
    { name: 'bedding', image: 'images/bedding.jpg' },
    // { name: 'Furniture', image: 'images/8.jpg' },
  ];

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

  featuredProducts = [
    { name: 'Smartphone', image: 'images/c1.jpg', price: '$499' },
    { name: 'Headphones', image: 'images/c2.jpg', price: '$199' },
    { name: 'Laptop', image: 'images/c3.jpg', price: '$899' },
    { name: 'Watch', image: 'images/c4.jpg', price: '$159' },
    // { name: 'Tablet', image: 'images/5.jpg', price: '$299' }
  ];

  categories = [
    { 
      name: 'furniture', 
      image: 'images/furniture.jpg' 
    },
    { 
      name: 'headphone', 
      image: 'images/headphone.jpg' 
    },
    { 
      name: 'kids', 
      image: 'images/kids.jpg' 
    },
    { 
      name: 'earrings', 
      image: 'images/earings.jpg' 
    },
    { 
      name: 'bath', 
      image: 'images/bath.jpg' 
    },
    { 
      name: 'kitchen', 
      image: 'images/kitchen.jpg' 
    },
    { 
      name: 'bedding', 
      image: 'images/bedding.jpg' 
    },
    // { 
    //   name: 'Headphones', 
    //   image: 'images/1.jpg' 
    // }
  ];

  techCarouselConfig = {
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
}

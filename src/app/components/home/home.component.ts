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
    { image: 'images/1.jpg', name: 'Tech Product 1', description: 'This is a description of product 1' },
    { image: 'images/2.jpg', name: 'Tech Product 2', description: 'This is a description of product 2' },
    { image: 'images/3.jpg', name: 'Tech Product 3', description: 'This is a description of product 3' }
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
  

  categories = [
    { name: 'Electronics', image: 'images/1.jpg' },
    { name: 'Fashion', image: 'images/2.jpg' },
    { name: 'Home Goods', image: 'images/3.jpg' },
    { name: 'Toys', image: 'images/4.jpg' },
    { name: 'Beauty', image: 'images/5.jpg' },
    { name: 'Sports', image: 'images/6.jpg' },
    { name: 'Books', image: 'images/7.jpg' },
    { name: 'Furniture', image: 'images/8.jpg' },
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
    { name: 'Smartphone', image: 'images/1.jpg', price: '$499' },
    { name: 'Headphones', image: 'images/2.jpg', price: '$199' },
    { name: 'Laptop', image: 'images/3.jpg', price: '$899' },
    { name: 'Watch', image: 'images/4.jpg', price: '$159' },
    { name: 'Tablet', image: 'images/5.jpg', price: '$299' }
  ];

  newTechItems = [
    { 
      name: 'Smartphone', 
      description: 'Latest smartphone with advanced features.', 
      price: '$999', 
      image: 'images/7.jpg' 
    },
    { 
      name: 'Laptop', 
      description: 'High-performance laptop for professionals.', 
      price: '$1200', 
      image: 'images/6.jpg' 
    },
    { 
      name: 'Smartwatch', 
      description: 'Wearable smartwatch for daily use.', 
      price: '$300', 
      image: 'images/2.jpg' 
    },
    { 
      name: 'Headphones', 
      description: 'Noise-cancelling over-ear headphones.', 
      price: '$250', 
      image: 'images/1.jpg' 
    },
    { 
      name: 'Smartphone', 
      description: 'Latest smartphone with advanced features.', 
      price: '$999', 
      image: 'images/7.jpg' 
    },
    { 
      name: 'Laptop', 
      description: 'High-performance laptop for professionals.', 
      price: '$1200', 
      image: 'images/6.jpg' 
    },
    { 
      name: 'Smartwatch', 
      description: 'Wearable smartwatch for daily use.', 
      price: '$300', 
      image: 'images/2.jpg' 
    },
    { 
      name: 'Headphones', 
      description: 'Noise-cancelling over-ear headphones.', 
      price: '$250', 
      image: 'images/1.jpg' 
    }
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

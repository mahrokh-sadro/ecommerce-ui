import { ChangeDetectorRef, Component,inject, ViewChild  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';


import {ProductService} from '../../services/product.service'
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-shop',
  imports: [
    CommonModule,
    MatCard,
    MatCardModule,
    MatIcon,
    MatButton,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatPaginator, 
    RouterLink
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
   
    baseUrl = "http://localhost:5001/api/";
    private http = inject(HttpClient);
    products?: any;
    types:string[]=[];
    brands:string[]=[];
    private dialog=inject(MatDialog);
    selectedBrands:string[]=[];
    selectedTypes:string[]=[];
    private productService=inject(ProductService);
    sortOptions=[
      {name:'Price: Low to high' , value:'priceAsc'},
      {name:'Price: High to low' , value:'priceDes'},
      {name:'Name: Ascending' , value:'nameAsc'},
      {name:'Name: Descending' , value:'nameDsc'},
    ] ;
    selectedSortValue:string=""; 
    private cartService=inject(CartService);
    cart: Cart | null = null;


    ngOnInit() {
      this.getProducts();
      this.getTypes();
      this.getBrands();
     

      
    
    }

    ngAfterViewInit() {
    }

    getTypes() {
      this.productService.getTypes()?.subscribe({
        next:(data:any)=>this.types=data,
      })

    }
 
    getBrands(){
      this.productService.getBrands()?.subscribe({
        next:(data:any)=>this.brands=data
      })
    }

    getProducts(brands?:string[],types?:string[]){
      this.productService.getProducts().subscribe({
        next:(data:any)=>{
          this.products=data;
          this.updatePaginatedProducts();
        },
        error:(error:any)=>console.log(error)
      })
    }

    paginatedProducts: any[] = []; // Subset for current page
    pageSize = 10;
    currentPage = 0;

    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedProducts();
    }
  
    updatePaginatedProducts() {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedProducts = this.products.slice(startIndex, endIndex);
    }


    openFilterDialog(){
      const dialogRef=this.dialog.open(FilterDialogComponent,{
        minWidth:'500px',
        data:{
          types:this.types,
          brands:this.brands,
          selectedBrands: this.selectedBrands,
          selectedTypes:this.selectedTypes
        }
      })

      dialogRef.afterClosed().subscribe({
        next:(result:any)=>{
          if(result){
            this.selectedBrands=result.selectedBrands;
            this.selectedTypes=result.selectedTypes;
            this.productService.getProducts(this.selectedBrands,this.selectedTypes).subscribe({
              next:(response:any)=>{
                this.products=response;
                this.updatePaginatedProducts();
              },
              error:(error:any)=>console.log(error)
            })
          }
        }
      });
    }

    onSortChange(event:any){
      console.log(event.options[0].value);
      this.selectedSortValue=event.options[0].value;
      this.productService.getProducts(this.selectedBrands,this.selectedTypes,this.selectedSortValue).subscribe({
        next:(response:any)=>{
          this.products=response;
          this.updatePaginatedProducts();
        },
        error:(error:any)=>console.log(error)
      })
    }


    @ViewChild("paginator") paginator: any;



    handlePageEvent(event: PageEvent) {
      console.log(event)
      // this.pageSize = event.pageSize;
      // this.currentPage = event.pageIndex;
      // this.updatePaginatedData();
    }

    addItemToCart(product:Product){
       this.cartService.addItemToCart(product);
    }
}


@Component({
  imports: [
    CommonModule,
    MatCard,
    MatCardModule,
    MatIcon,
    MatButton,
    MatDividerModule,
    MatListModule,
    FormsModule,

  ],
  templateUrl: 'filter-dialog.component.html',
})
export class FilterDialogComponent {
 
  private dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  // selectedBrands: string[] = this.data.selectedBrands;
  // selectedTypes: string[] = this.data.selectedTypes;

  ngOnInit() {
  }

  // Method to handle changes in the form
  onCheckboxChange(type: number): void {
 
  }

  // Method to save changes
  filter(): void {
    // console.log('filter')
    // console.log(this.selectedBrands) ;
    // console.log(this.selectedTypes) ;
    this.dialogRef.close(this.data);
  }

}
import { ChangeDetectorRef, Component,inject, ViewChild  } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {MatButton} from '@angular/material/button';
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
import { LoadingIconComponent } from '../loading-icon/loading-icon.component';

@Component({
  selector: 'app-shop',
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    MatButton,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatPaginator, 
    RouterLink,
    LoadingIconComponent,
    FormsModule
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
    cartService=inject(CartService);
    cart: Cart | null = null;
    isLoading:boolean=false;
    searchTerm: string = '';
    private router=inject(ActivatedRoute);
    category:string="";

    ngOnInit() {
      this.getTypes();
      this.getBrands();
      this.router.queryParams.subscribe(params => {
        this.category = params['category']?.toLowerCase();
        console.log(this.category);
        this.getProducts(this.category);
      });
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

    getProducts(category:string){
      this.isLoading=true;
      this.productService.getProducts().subscribe({
        next:(data:any)=>{
          if(category){
            this.products=data.filter((p:Product)=>p.type?.toLowerCase()==category);
          }else{
            this.products=data;
          }
          console.log( this.products)
          console.log( 'category',category)
          this.updatePaginatedProducts();
          this.isLoading=false;
        },
        error:(error:any)=>{
          console.log(error);
          this.isLoading=false;
        }
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
      this.productService.getProducts(this.selectedBrands,this.selectedTypes,this.selectedSortValue,this.searchTerm).subscribe({
        next:(response:any)=>{
          this.products=response;
          this.updatePaginatedProducts();
        },
        error:(error:any)=>console.log(error)
      })
    }


    @ViewChild("paginator") paginator: any;



    handlePageEvent(event: PageEvent) {

    }

    addItemToCart(product: Product) {
      product.isClicked=true;
      this.cartService.addItemToCart(product).subscribe();
    }

   onSearch(){
    this.productService.getProducts(this.selectedBrands,this.selectedTypes,this.selectedSortValue,this.searchTerm).subscribe({
      next:(response:any)=>{
        this.products=response;
        this.updatePaginatedProducts();
      },
      error:(error:any)=>console.log(error)
    })
   }
    

}


@Component({
  imports: [
    CommonModule,
    MatCardModule,
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

  ngOnInit() {
  }

  onCheckboxChange(type: number): void {
 
  }

  filter(): void {
    this.dialogRef.close(this.data);
  }

}
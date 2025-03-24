import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = "http://localhost:5001/api/";
  private http = inject(HttpClient);
  brands:string[]=[];
  types:string[]=[];


  constructor() { }

  getProducts(brands?:string[],types?:string[],sort?:string,searchTerm?:string){
    let params=new HttpParams();
    if(brands && brands.length>0){
      params=params.append('brands',brands.join(','));
    }

    if(types && types.length>0){
      params=params.append('types',types.join(','));
    } 
    
    if(sort && sort.length>0){
      params=params.append('sort',sort);
    } 

    if(searchTerm && searchTerm.length>0){
      params=params.append('searchTerm',searchTerm);
    } 
    return this.http.get(this.baseUrl + "Product/products",{params});
  }

  getBrands(){
    if(this.brands.length>0) return;
    return this.http.get<String[]>(this.baseUrl+"Product/brands");
  }

  getTypes(){
    if(this.types.length>0) return;
    return this.http.get<String[]>(this.baseUrl+"Product/types");
  }

  getProductById(id:number){
     return this.http.get<any>(this.baseUrl+"Product/"+id);
  }
}

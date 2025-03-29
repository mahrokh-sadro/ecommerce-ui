import { inject, Injectable, signal } from '@angular/core';
import { Order } from '../models/Order';
import { environment } from '../../environments/environment';
import { data } from 'jquery';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl=environment.apiUrl;
  private http=inject(HttpClient);

  getOrders(){
    return this.http.get(this.baseUrl + "admin/orders",{withCredentials:true}).pipe(
      map((data:any)=>{
          return data;
      })
    )
  }

  refund(orderId:number){
    return this.http.post<any>(this.baseUrl + "admin/refund/" + orderId,{withCredentials:true}).pipe(
      map((data:any)=>{
        return data;
      })
    )
  }
}

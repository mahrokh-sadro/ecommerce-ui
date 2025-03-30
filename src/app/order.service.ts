import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Order } from './models/Order';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;
  private http=inject(HttpClient);
  orders=signal<any[] | null>(null);

  getOrders(){
    return this.http.get<Order[]>(this.baseUrl+"payment/orders",{withCredentials:true}).pipe(
      map(data=>{
        return data
      })
    )
  }

  getOrder(orderId:number){
    return this,this.http.get<any>(this.baseUrl+"payment/"+orderId).pipe(
      map(data=>{
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

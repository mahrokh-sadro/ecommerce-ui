import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Order } from './models/Order';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = "http://localhost:5001/api/";
  private http=inject(HttpClient);
  orders=signal<any[] | null>(null);
  // getDeliveryMethods(){
  //     return this.http.get<DeliveryMethod[]>(this.baseUrl+"payment/delivery-methods").pipe(
  //       map(data=>{
  //         this.deliveryMethods=data;
  //         return data;
  //       })
  //     )
  //   }

  getOrders(){
    return this.http.get<Order[]>(this.baseUrl+"payment/orders",{withCredentials:true}).pipe(
      map(data=>{
        console.log('data',data)
        return data
      })
    )
  }

  getOrder(orderId:number){
    return this,this.http.get<any>(this.baseUrl+"payment/"+orderId).pipe(
      map(data=>{
        console.log('order',data);
        return data;
      })
    )
  }
}

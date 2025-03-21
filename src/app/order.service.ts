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
  orders=signal<Order | null>(null);
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
        return data
      })
    )
  }
}

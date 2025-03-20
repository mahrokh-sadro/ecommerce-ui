import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { map } from 'rxjs';
import { BillingDetails } from '../models/BillingDetails';
import {Address} from '../models/user';
import { PaymentSummary } from '../models/PaymentSummary';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = "http://localhost:5001/api/";
  private http = inject(HttpClient);
  deliveryMethods:DeliveryMethod[]=[];
  
  constructor() { }

  getDeliveryMethods(){
    return this.http.get<DeliveryMethod[]>(this.baseUrl+"payment/delivery-methods").pipe(
      map(data=>{
        this.deliveryMethods=data;
        return data;
      })
    )
  }

  createOrder( payment:PaymentSummary,billingDetails:BillingDetails,cartItems:any[]){
    
    const payload = {
      payment,
      billingDetails,
      cartItems // Make sure this is an array
    };

    return this.http.post<Boolean>(this.baseUrl+"Payment/order",payload,{withCredentials:true}).pipe(
      map(data=>{
         return data
      })
    )
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { map } from 'rxjs';
import { BillingDetails } from '../models/BillingDetails';
import {Address} from '../models/user';
import { PaymentSummary } from '../models/PaymentSummary';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.apiUrl;
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

  createOrder( payment:PaymentSummary,billingDetails:BillingDetails,cartItems:any[],addressData:any){
    let shippingAddress={} as Address;
    shippingAddress.name=addressData?.name;
    shippingAddress.line1=addressData?.address?.line1;
    shippingAddress.line2=addressData?.address?.line2;
    shippingAddress.city=addressData?.address?.city;
    shippingAddress.state=addressData?.address?.state;
    shippingAddress.postalCode=addressData?.address?.postal_code;
    shippingAddress.country=addressData?.address?.country;

    const payload = {
      payment,
      billingDetails,
      cartItems,
      shippingAddress
    };
    return this.http.post<any>(this.baseUrl+"Payment/order",payload,{withCredentials:true}).pipe(
      map(data=>{
         return data
      })
    )
  }
}

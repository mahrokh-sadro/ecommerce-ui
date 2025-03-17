import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DeliveryMethod } from '../models/DeliveryMethod';
import { map } from 'rxjs';

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
}

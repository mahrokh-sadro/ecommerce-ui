import { Component, inject } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { loadStripe, Stripe} from '@stripe/stripe-js';
import { ConfirmationToken, StripeAddressElement, StripeAddressElementChangeEvent, StripePaymentElement, StripePaymentElementChangeEvent } from '@stripe/stripe-js';

import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { StripeService } from '../services/stripe.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { CartService } from '../services/cart.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { firstValueFrom, from } from 'rxjs';
import {CheckoutReviewComponent} from './checkout-review/checkout-review.component'
import { UserService } from '../services/user.service';
import { Address } from '../models/user';

@Component({
  selector: 'app-checkout',
  imports: [
    OrderSummaryComponent,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    DeliveryComponent,
    CheckoutReviewComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  private location=inject(Location);
  private stripeService=inject(StripeService);
  addressElement?: StripeAddressElement;
  paymentElement?: StripePaymentElement;
  private _formBuilder = inject(FormBuilder);
  private cartService=inject(CartService);
  private userService=inject(UserService);
  addressData: any;
  status={
    address:false,
    payment:false
  }
  confirmationToken?: ConfirmationToken;

  constructor(){
  }

  async ngOnInit(){
    this.addressElement=await this.stripeService.createAddressElement();
    this.addressElement.mount('#address-element');

    this.paymentElement=await this.stripeService.createPaymentElement();
    this.paymentElement.mount('#payment-element');

     // Listen for address changes
    this.addressElement.on('change', (event: StripeAddressElementChangeEvent) => {
    if (event.complete) {
        console.log('Address details:', event.value);
        this.addressData=event.value;
        this.status.address=event.complete;
      }
    });

     // Add a change event listener to the payment element
     this.paymentElement.on('change', (event: StripePaymentElementChangeEvent) => {
      if (event.complete) {
        console.log('Payment details:', event.value);
        this.status.payment = event.complete;  // Update the payment completion status
      }
    });
    
  }
 
  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 1) {
      // Ensure addressData is populated before proceeding
      if (this.addressData) {
        const address: Address = {
          line1: this.addressData?.address?.line1,
          line2: this.addressData?.address?.line2,
          city: this.addressData?.address?.city,
          state: this.addressData?.address?.state,
          postalCode: this.addressData?.address?.postal_code,
          country: this.addressData?.address?.country
        };

        console.log('addressData', this.addressData);
        console.log('address', address);
        // Save address to the backend
        this.userService.updateAddress(address).subscribe({
          next: (response) => {
            console.log('Address saved successfully:', response);
          },
          error: (error) => {
            console.error('Error saving address:', error);
          }
        });
      } else {
        console.error('Address data is not available');
      }
    }
  
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
  
    if (event.selectedIndex === 3) {
      await this.getConfirmationToken();
    }
  }
  

  async getConfirmationToken() {
    try {
      if (this.status.address && this.status.payment) {
        const result = await this.stripeService.createConfirmationToken();
        if (result.error) throw new Error(result.error.message);
        this.confirmationToken = result.confirmationToken;
        console.log(this.confirmationToken);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async placeOrder(){
    try{
       if(this.confirmationToken){
          const result = await this.stripeService.confirmPayment(this.confirmationToken);
          if(!result.error){
            console.log(1111111)
            this.cartService.deleteCart();
            this.cartService.selectedDeliveryMethod.set(null);
          }
          
       }
    }
    catch(error:any){
      
    }
  }

}

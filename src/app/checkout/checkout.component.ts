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
import { StripeService } from '../stripe.service';
import { DeliveryComponent } from './delivery/delivery.component';
import { CartService } from '../services/cart.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { firstValueFrom } from 'rxjs';

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
    DeliveryComponent
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

  constructor(){
  }

  async ngOnInit(){
    this.addressElement=await this.stripeService.createAddressElement();
    this.addressElement.mount('#address-element');
  }
 
  async onStepChange(event: StepperSelectionEvent) {
    if (event.selectedIndex === 2) {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
  }
}

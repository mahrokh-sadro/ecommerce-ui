import { Component, Input } from '@angular/core';
import { ConfirmationToken } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout-review',
  imports: [],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {
  @Input() confirmationToken?: ConfirmationToken;
  cardValue:string="**** **** **** ";

  ngonInit(){
    console.log('--',this.confirmationToken)
  }
}

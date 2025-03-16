import { inject, Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeAddressElement, StripeAddressElementOptions, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { CartService } from './services/cart.service';
import { UserService } from './services/user.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Cart } from './models/cart';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = "http://localhost:5001/api/";
  private stripePromise: Promise<Stripe | null>;
  stripePublishableKey="pk_test_51R2FT8GfAmxmqqaWJc8C7LRmWpxd6wgFCIxqWPa4aHCWAbsXvHXqSSwiWpLsheZ4gg1GIxtgSzBJeiB6GdGnxnx000Q0Enkn5m";
  private cartService = inject(CartService);
  private userService = inject(UserService);
  private http = inject(HttpClient);
  private elements?: StripeElements;
  private addressElement?: StripeAddressElement;
  private paymentElement?: StripePaymentElement;
  
  
  constructor() {
    this.stripePromise = loadStripe(this.stripePublishableKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async initializeElements() {
    if (!this.elements) {
      const stripe = await this.getStripeInstance();
      if (!stripe) {
        throw new Error('Stripe has not been loaded');
      }
  
      const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
      
      if (!cart.clientSecret) {
        throw new Error('Missing clientSecret in payment intent');
      }
  
      this.elements = stripe.elements({
        clientSecret: cart.clientSecret,
        appearance: { labels: 'floating' }
      });
    }
    return this.elements;
  }
  
  
  createOrUpdatePaymentIntent() {
    const cart = this.cartService.cart();
    const hasClientSecret = !!cart?.clientSecret;
    if (!cart) throw new Error('no cart!');
    return this.http.post<Cart>(this.baseUrl + 'payment/' + cart.id, {}).pipe(
      map(async cart => {
        if (!hasClientSecret) {
          await firstValueFrom(this.cartService.setCart(cart));
          return cart;
        }
        return cart;
      })
    )
  }
  
  async createAddressElement() {
    if (!this.addressElement) {
      const elements = await this.initializeElements();
      if (elements) {
        const options: StripeAddressElementOptions = {
          mode: 'shipping'
        };
        this.addressElement = elements.create('address', options);
      } else {
        throw new Error('no elements instance');
      }
    }
    return this.addressElement;
  }





}

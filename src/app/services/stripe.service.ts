import { inject, Injectable } from '@angular/core';
import { ConfirmationToken, loadStripe, Stripe, StripeAddressElement, StripeAddressElementOptions, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { Cart } from '../models/cart';

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
          // await firstValueFrom(this.cartService.setCart(cart));
          this.cartService.setCart(cart)
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

        const user = this.userService.loggedInUser();
        console.log('user',user)
        const _defaultvalues = user?.address
          ? {
              name:user?.firstName + " " + user?.lastName,
              address: {
                line1: user.address.line1 || '',
                line2: user.address.line2 || '',
                city: user.address.city || '',
                state: user.address.state || '',
                postal_code: user.address.postalCode || '',
                country: user.address.country || '',
              },
            }
          : {}; 

        const options: StripeAddressElementOptions = {
          mode: 'shipping',
          defaultValues: _defaultvalues, 
        };

        this.addressElement = elements.create('address', options);
      } else {
        throw new Error('no elements instance');
      }
    }
    return this.addressElement;
  }

  async createPaymentElement() {
    if (!this.paymentElement) {
      const elements = await this.initializeElements();
      if (elements) {
        this.paymentElement = elements.create('payment');
      } else {
        throw new Error('no elements instance');
      }
    }
    return this.paymentElement;
  }

  clearElements() {
    this.elements = undefined;
    this.addressElement = undefined;
    this.paymentElement = undefined;
  }

  async createConfirmationToken() {
    const stripe = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();
    if (result.error) throw new Error(result.error.message);
    if (stripe) {
      return await stripe.createConfirmationToken({elements});
    } else {
      throw new Error('Stripe not available');
    }
  }

  async confirmPayment(confirmationToken: ConfirmationToken) {
    const stripe = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();
    if (result.error) throw new Error(result.error.message);

    const clientSecret = this.cartService.cart()?.clientSecret;

    if (stripe && clientSecret) {
      return await stripe.confirmPayment({
        clientSecret: clientSecret,
        confirmParams: {
          confirmation_token: confirmationToken.id
        },
        redirect: 'if_required'
      })
    } else {
      throw new Error('Stripe not available');
    }
  }
}

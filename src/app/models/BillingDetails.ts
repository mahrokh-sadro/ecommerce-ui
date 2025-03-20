import { Address } from "./user"

export class BillingDetails{
    // shippingAddress:Address | undefined;
    email?: string;
    name?: string;
    phone?: string;
    deliveryMethodId?:number;
    paymentIntentId?:string;
}
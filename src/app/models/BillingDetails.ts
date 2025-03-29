import { Address } from "./user"

export class BillingDetails{
    email?: string;
    name?: string;
    phone?: string;
    deliveryMethodId?:number;
    paymentIntentId?:string;
}
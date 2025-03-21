export class Order{
    id?:number;
    shippingEmail?:string;
    userId?:string;
    orderDate?:Date;
    shippingAddressId?:number;
    deliveryMethodId?:number;
    paymentSummaryId?:number;
    // CartItems
    subtotal?:number;
    discount?:number;
    taxAmount?:number;
    total?:number;
    // PaymentIntentId

}
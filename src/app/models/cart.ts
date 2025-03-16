export interface Cart{
    id:string;
    cartItems:CartItem[];
    clientSecret?:string;
    paymentIntentId?:string;
    deliveryMethodId?:number;

}

export interface CartItem{
    shoppingCartId:string; //nanoid
    productId:number;
    quantity:number;
    name:string;
    description:string;
    price:number;
    image:string;
}
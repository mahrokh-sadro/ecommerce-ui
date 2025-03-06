export interface Cart{
    id:string;
    cartItems:CartItem[];
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
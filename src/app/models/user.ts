export interface User{
    email:string;
    firstName:string;
    lastName:string;
    address:Address;
}

export interface Address{
    line1:string;
    line2?:string;
    city:string;
    state:string;
    postalCode:string;
    country:string;
}
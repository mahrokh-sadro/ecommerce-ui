import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'checkout' , component:CheckoutComponent},
    {path:'products' , component:ShopComponent},
    {path:'products/:id' , component:ProductDetailsComponent},
    {path:'cart' , component:CartComponent}

];

import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'checkout' , component:CheckoutComponent,canActivate:[authGuard]},
    {path:'products' , component:ShopComponent},
    {path:'products/:id' , component:ProductDetailsComponent},
    {path:'cart' , component:CartComponent},
    {path:'user/login',component:LoginComponent},
    {path:'user/register',component:RegisterComponent},

];

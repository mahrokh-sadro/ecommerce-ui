import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SuccessComponent } from './checkout/success/success.component';
import { authGuard } from './auth.guard';
import { cartGuard } from './cart.guard';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './admin.guard';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'checkout' , component:CheckoutComponent,canActivate:[authGuard,cartGuard]},
    {path:'checkout/success' , component:SuccessComponent,canActivate:[authGuard]},
    {path:'products' , component:ShopComponent},
    {path:'products/:id' , component:ProductDetailsComponent},
    {path:'cart' , component:CartComponent},
    {path:'user/login',component:LoginComponent},
    {path:'user/register',component:RegisterComponent},
    {path:'orders' , component:OrdersComponent},
    {path:'orders/:id' , component:OrderDetailsComponent},
    {path:'admin' , component:AdminComponent,canActivate:[adminGuard]},
    {path:'privacy-policy' , component:PrivacyPolicyComponent},
    { path: 'terms', component: TermsOfServiceComponent },
    { path: 'contact-us', component: ContactUsComponent },

];

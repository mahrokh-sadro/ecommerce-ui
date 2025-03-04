import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/shop/product-details/product-details.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'products' , component:ShopComponent},
    {path:'products/:id' , component:ProductDetailsComponent}
];

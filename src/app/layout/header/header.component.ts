import { Component, inject } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatBadge} from '@angular/material/badge';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import { IsAdminDirective } from '../../is-admin.directive';


import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [
    MatIcon,
    MatButton,
    MatBadge,
    RouterLink,
    RouterLinkActive,
    MatMenuModule,
    IsAdminDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
   cartService=inject(CartService);
   userService=inject(UserService);
   private router=inject(Router);

   logout(){
     this.userService.logout().subscribe();
     this.router.navigateByUrl('/user/login');
   }
}

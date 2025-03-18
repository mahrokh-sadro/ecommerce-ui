import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
    private router=inject(Router);
  
}

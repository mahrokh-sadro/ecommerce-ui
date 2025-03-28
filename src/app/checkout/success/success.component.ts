import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'; 
import { Router,RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoadingIconComponent } from '../../components/loading-icon/loading-icon.component';

@Component({
  selector: 'app-success',
  imports: [
    MatIconModule,
    RouterLink,
    CommonModule,
    MatButtonModule,
    LoadingIconComponent
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {
    private router=inject(ActivatedRoute);
    orderId:any;
    total:any;

    ngOnInit() {
      this.router.queryParams.subscribe(params => {
        this.orderId=params['orderId'];
        this.total=params['total'];
      });
    }
    
}

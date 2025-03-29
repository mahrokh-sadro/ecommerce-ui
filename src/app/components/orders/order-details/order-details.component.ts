import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { OrderService } from '../../../order.service';
import { LoadingIconComponent } from '../../loading-icon/loading-icon.component';

@Component({
  selector: 'app-order-details',
  imports: [
    MatCardModule,
    CommonModule,
    LoadingIconComponent
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private route=inject(ActivatedRoute);
  id:string | null=null;
  private orderService=inject(OrderService);
  orderData:any;
  isLoading:boolean=false;

  ngOnInit(){
    this.isLoading=true;
    this.id=this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.orderService.getOrder(+this.id).subscribe({
        next:(data)=>{
          this.orderData=data;
          this.isLoading=false;
        }
      })
    }
    
  }

}

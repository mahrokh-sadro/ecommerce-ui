import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


import { OrderService } from '../../../order.service';

@Component({
  selector: 'app-order-details',
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private route=inject(ActivatedRoute);
  id:string | null=null;
  private orderService=inject(OrderService);
  orderData:any;

  ngOnInit(){
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    if(this.id){
      this.orderService.getOrder(+this.id).subscribe({
        next:(data)=>{
          this.orderData=data
        }
      })
    }
  }

}

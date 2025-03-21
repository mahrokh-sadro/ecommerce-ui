import { Component, inject } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { OrderService } from '../../order.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-orders',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  
  orderService=inject(OrderService);
  ngOnInit(){
     this.orderService.getOrders().subscribe(data=>{
      console.log('orders1',data);
      this.orderService.orders.set(data);
     })
  }
}

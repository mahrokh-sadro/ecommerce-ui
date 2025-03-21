import { Component, inject } from '@angular/core';
import { OrderService } from '../../order.service';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  
  private orderService=inject(OrderService);
  ngOnInit(){
     this.orderService.getOrders().subscribe(data=>{
      console.log('orders1',data);
     })
  }
}

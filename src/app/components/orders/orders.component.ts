import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


import { OrderService } from '../../order.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-orders',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  
  orderService=inject(OrderService);
  displayedColumns: string[] = [ 'image','id', 'orderDate', 'shippingEmail','status','total'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  ngOnInit(){
     this.orderService.getOrders().subscribe(data=>{
      console.log('myorders',data);
      this.orderService.orders.set(data);
      this.dataSource.data = this.orderService.orders() ?? [];
      // this.dataSource.paginator = this.paginator;

     })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

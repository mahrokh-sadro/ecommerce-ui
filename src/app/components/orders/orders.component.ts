import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

import { OrderService } from '../../order.service';
import { MatCardModule } from '@angular/material/card';
import { LoadingIconComponent } from '../loading-icon/loading-icon.component';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    LoadingIconComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  
  orderService=inject(OrderService);
  displayedColumns: string[] = [ 'image','id', 'orderDate', 'shippingEmail','status','total','actions'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;
  isLoading:boolean=false;
  http: any;
  baseUrl= environment.apiUrl;
  private snackBar = inject(MatSnackBar);

  ngOnInit(){
    this.isLoading=true;
     this.orderService.getOrders().subscribe(data=>{
      this.orderService.orders.set(data);
      this.dataSource.data = this.orderService.orders() ?? [];
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
      this.isLoading=false;
     })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  refundOrder(orderId: number) {
    this.orderService.refund(orderId).subscribe({
      next: (response) => {
        const order = this.dataSource.data.find(o => o.id === orderId);
        if (order) {
          order.status = 'Refunded'; 
        }
        this.dataSource._updateChangeSubscription(); 
        this.snackBar.open('Refund successful', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Refund failed:', err);
        this.snackBar.open('Refund failed', 'Close', { duration: 3000 });
      }
    });
  }
}

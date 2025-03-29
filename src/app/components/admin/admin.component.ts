import { Component, inject, ViewChild } from '@angular/core';

import { CommonModule,DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


import { AdminService } from '../../services/admin.service';
import { MatCardModule } from '@angular/material/card';
import { LoadingIconComponent } from '../loading-icon/loading-icon.component';
@Component({
  selector: 'app-admin',
  imports: [
    MatCardModule,
    MatIconModule,
    DatePipe,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    LoadingIconComponent,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
   
    adminService=inject(AdminService);
    displayedColumns: string[] = [ 'image','id', 'orderDate', 'shippingEmail','status','total','actions'];
    dataSource = new MatTableDataSource<any>([]);
    @ViewChild(MatPaginator)
    paginator: MatPaginator = new MatPaginator;
    isLoading:boolean=false;
    private snackBar = inject(MatSnackBar);

    ngOnInit(){
      this.isLoading=true;
       this.adminService.getOrders().subscribe(data=>{
        console.log('al orders',data);
        this.dataSource.data = data;
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
      this.adminService.refund(orderId).subscribe({
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

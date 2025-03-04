import { Component,inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component'; // Import the component
import { HttpClient } from '@angular/common/http';
import { ShopComponent } from './components/shop/shop.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,ShopComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // baseUrl = "http://localhost:5001/api/";
  // private http = inject(HttpClient);
  // title = 'ui';
  
  ngOnInit() {
    // this.http.get(this.baseUrl + "Product/products").subscribe({
    //   next: data => console.log(data),
    //   error: err => console.error('Error: ', err) // It's useful to handle errors
    // });
  }

}

import { Component,inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder=inject(FormBuilder);
  private userService=inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  returnUrl = '';

  hidePassword = true;
  loginForm=this.formBuilder.group({
     email:[''],
     password:['']
  });
  constructor() {
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
    if (url) {
      console.log(url)
      this.returnUrl = url;
    }
  }
  onSubmit(){
    // console.log(this.loginForm.value)
    this.userService.login(this.loginForm.value).subscribe({
       next:()=>{
         this.userService.getUserInfo().subscribe();
         this.router.navigateByUrl(this.returnUrl)
       }
    })
  }



}

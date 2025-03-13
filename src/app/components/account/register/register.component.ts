import { Component,inject } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule,KeyValuePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { JsonPipe } from '@angular/common';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
    MatListModule,
    MatTooltipModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
   private formBuilder=inject(FormBuilder);
   private userService=inject(UserService);
   private router=inject(Router);
   errors:any;

   form=this.formBuilder.group({
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
   })

   onSubmit(){
     this.userService.register(this.form.value).subscribe({
       next:()=>{
        this.router.navigateByUrl("user/login");
       },
       error:errors=>{
         this.errors=Object.entries(errors);
         console.log('errors',this.errors)
       }
     })
   }
}

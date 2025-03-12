import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable,inject,signal } from '@angular/core';

import { Address, User } from '../models/user';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost:5001/api/";
  private http=inject(HttpClient);
  loggedInUser=signal<User|null>(null);

  constructor() { }

  login(values:any){
    console.log('values',values)
    let params = new HttpParams().set('useCookies', 'true');
    return this.http.post<User>(this.baseUrl+'login?',values,{params,withCredentials:true});
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'user/register', values).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error); 
        return throwError(() => error.error.errors); 
      })
    );
  }

  updateAddress(address:Address){
    return this.http.post(this.baseUrl+"user/address",address)
  }

  getUserInfo(){
    return this.http.get<User>(this.baseUrl+"user/user-info",{withCredentials:true}).pipe(
      map(user=>{
        this.loggedInUser.set(user);
        return user;
      }),
      catchError((error) => {
        console.error('getUserInfo failed', error); 
        throw error;
      })
    )
  } 
  
  logout() {
    return this.http.post(this.baseUrl + 'user/logout', {}, { withCredentials: true }).pipe(
      map(() => {
        this.loggedInUser.set(null); 
      }),
      catchError((error) => {
        console.error('Logout failed', error); 
        throw error; 
      })
    );
  }
  
}

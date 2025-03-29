import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable,inject,signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { Address, User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl=environment.apiUrl;
  private http=inject(HttpClient);
  loggedInUser=signal<User|null>(null);

  constructor() { }

  login(values:any){
    let params = new HttpParams().set('useCookies', 'true');
    return this.http.post<User>(this.baseUrl+'login?',values,{params,withCredentials:true});
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'user/register', values).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('registration error:', error); 
        return throwError(() => error.error.errors); 
      })
    );
  }

  updateAddress(address:Address){
    return this.http.post(this.baseUrl+"user/address",address,{withCredentials:true});
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
        console.error('logout failed', error); 
        throw error; 
      })
    );
  }
  
  getAuthStatus(){
    return this.http.get<Boolean>(this.baseUrl+'user/auth-status');
  }
}

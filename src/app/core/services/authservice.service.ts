import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmets } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  _HttpClient = inject(HttpClient);
  userData:any;
  private readonly _Router = inject(Router);

  setRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/auth/signup` ,data );
  }

  setLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/auth/signin`,data);
  }

  saveUserData():void{
      if(localStorage.getItem('userdata') !== null){
        this.userData = jwtDecode(localStorage.getItem('userdata') !) ;

      }
  }

  logout():void{
    localStorage.removeItem('userdata');
    this.userData = null;
    this._Router.navigate(['/login']);

  }

  setEamilVerfiy(data:object):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/auth/forgotPasswords`, data)
  };
  setCodeVerfiy(data:object):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/auth/verifyResetCode`, data)
  };
  setResetPassword(data:object):Observable<any>{
    return this._HttpClient.put(`${environmets.baseUrl}/api/v1/auth/resetPassword`, data)
  };
  

}

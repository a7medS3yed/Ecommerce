import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../core/services/authservice.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.getVerifyEmailSub?.unsubscribe();
    this.getVerifyCodeSub?.unsubscribe();
    this.getResetPassSub?.unsubscribe();
  }

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthserviceService = inject(AuthserviceService);
  private readonly _Router = inject(Router);
  getVerifyEmailSub!:Subscription;
  getVerifyCodeSub!:Subscription;
  getResetPassSub!:Subscription;



  step:number = 1;


  verifyEmail:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]]
  })

  verifyCode:FormGroup = this._FormBuilder.group({
    code:[null, Validators.required]
  })
  resetPassword:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Za-z\d]{8,}$/) ]]
  })


veriryEmailSubmit(){

  let email = this.verifyEmail.get('email')?.value;
  this.resetPassword.patchValue(email);

  this.getVerifyEmailSub = this._AuthserviceService.setEamilVerfiy(this.verifyEmail.value).subscribe({
    next: (res) => {
      console.log(res);
      if(res.statusMsg === 'success'){
        this.step = 2;
      }
    },
    error:(err) =>{
      console.log(err);
    }
  })
}
veriryCodeSubmit(){
  this.getVerifyCodeSub = this._AuthserviceService.setCodeVerfiy(this.verifyCode.value).subscribe({
    next: (res) => {
      console.log(res);
      if(res.status === 'success'){
        this.step = 3;
        }
    },
    error:(err) =>{
      console.log(err);
    }
  })
}
resetPasswordSubmit(){
 this.getResetPassSub = this._AuthserviceService.setResetPassword(this.resetPassword.value).subscribe({
    next: (res) => {
      console.log(res);
      localStorage.setItem('userdata', res.token);
      this._AuthserviceService.saveUserData();
      this._Router.navigate(['/home']);
    },
    error:(err) =>{
      console.log(err);
    }
  })
}

}

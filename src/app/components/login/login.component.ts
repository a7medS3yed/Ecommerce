import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../core/services/authservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.getLoginSub?.unsubscribe();
  }
  
  isLodding= false;
  msgError = '';
  private getLoginSub !:Subscription;


  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthserviceService = inject(AuthserviceService);
  private readonly _Router = inject(Router);


  loginForm:FormGroup = this._FormBuilder.group({
    email:[null , [Validators.required, Validators.email]],
    password:[null, [Validators.required, Validators.pattern(/^[A-Za-z\d]{8,}$/) ]]
  });


  loginSubmit(){
    if(this.loginForm.valid){
      this.isLodding = true;
     this.getLoginSub = this._AuthserviceService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message == 'success'){
            setTimeout(() => {

              // 1.save token

              localStorage.setItem('userdata',res.token);

              // 2. decode token

              this._AuthserviceService.saveUserData();

              // 3. navigate

              this._Router.navigate(['/home']);
            }, 1000);
          }
          this.isLodding = false;
        },
        error:(err:HttpErrorResponse)=>{
          
          console.log(err);
          this.msgError = err.error.message;
          this.isLodding = false;
        }
    })
    }
  }

}

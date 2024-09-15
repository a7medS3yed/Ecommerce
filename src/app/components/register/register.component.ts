import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthserviceService } from '../../core/services/authservice.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.getRegisterSub?.unsubscribe();
  }

  msgError:string = '';
  isLoadding:boolean = false;
  msgSuccess:boolean = false;
  private getRegisterSub! :Subscription
  
 


  // injection from authService

 private readonly _AuthserviceService = inject(AuthserviceService)
 private readonly _FormBuilder = inject(FormBuilder);
 private readonly _Router = inject(Router);

 


  // form object and validation

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null,[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Za-z\d]{8,}$/) ]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null,
  //     [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]
  //   )

  // }, this.confirmPassword)

  registerForm:FormGroup = this._FormBuilder.group({
    name: [ null,[Validators.required, Validators.minLength(5), Validators.maxLength(15)] ],
    email: [ null, [Validators.required, Validators.email]],
    password: [ null, [Validators.required, Validators.pattern(/^[A-Za-z\d]{8,}$/) ]],
    rePassword: [ null ],
    phone: [ null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators: this.confirmPassword});

  registerSubmit():void{
    if(this.registerForm.valid){

      this.isLoadding = true;

    this.getRegisterSub =  this._AuthserviceService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if(res.message == 'success'){
            this.msgSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/login']);
            }, 1500);
          }

          this.isLoadding = false;
        },
        error: (err:HttpErrorResponse) => {
          this.msgError = err.error.message
          console.log(err);

          this.isLoadding = false;
        }
      })
      
    }
    else{
      this.registerForm.setErrors({misMatch:true});
      this.registerForm.markAllAsTouched();
    }
  }


  // confirm password ---> custom validation

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }
    else{
      return {misMatch:true};
    }
  }

}

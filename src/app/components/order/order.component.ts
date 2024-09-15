import { fileURLToPath } from 'node:url';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { OrderService } from '../../services/order.service';
import { error } from 'console';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('id');
      }
    })
  }

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  private readonly _OrdersService = inject(OrdersService);
  cartId : null | string = '';

  orderForm : FormGroup = this._FormBuilder.group({
    detalis: [null, Validators.required],
    phone: [null, Validators.required],
    address: [null, Validators.required],

  });



  

  ordersSubmit():void{
    console.log(this.orderForm.value);
    this._OrdersService.cheackOut(this.cartId, this.orderForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === "success"){
          
          window.open(res.session.url )
        }
        
      }
    })

  }

  

}

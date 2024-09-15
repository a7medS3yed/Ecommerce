import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
   this.getCartSub?.unsubscribe();
   this.deleteItemSub?.unsubscribe();
   this.updateItemSub?.unsubscribe();
   this.clearCartSub?.unsubscribe();
  }
  

  private readonly _CartService = inject(CartService);
  cartDetalies:Icart = {} as Icart;
  private getCartSub!:Subscription;
  private deleteItemSub!:Subscription;
  private updateItemSub!:Subscription;
  private clearCartSub!:Subscription;

  ngOnInit(): void {
  this.getCartSub =  this._CartService.getCart().subscribe({
      next: (cart) =>{     
         this.cartDetalies = cart.data
         console.log( this.cartDetalies );
        },
      error: (error) => console.error(error)
    })
  }

  deleteItem(id:string):void{
    this.deleteItemSub = this._CartService.deleteItemFromCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetalies = res.data;
        this._CartService.cartNumber.set(res.numOfCartItems)
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  updateQuantity(id:string, count:number):void{
    this.updateItemSub = this._CartService.updateItemFromCart(id, count).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetalies = res.data;
      },
      error:(err)=>{
        console.error(err);
      }
    })
  }

  clearCart():void{

    this.clearCartSub = this._CartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === "success"){
          this.cartDetalies = {} as Icart;
          this._CartService.cartNumber.set(0)
        }
        
      },
      error:(err)=>{
        console.error(err)
      }
    })

  }



}

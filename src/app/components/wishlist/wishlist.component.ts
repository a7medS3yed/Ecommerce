import { Iproducts } from './../../core/interfaces/iproducts';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
 

  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _CartService = inject(CartService)
  wishList:WritableSignal<Iproducts[]> = signal([]);
  

  ngOnInit(): void {
    this._WishlistService.getProductsFromWish().subscribe({
      next:(data)=>{
        console.log(data.data);
        this.wishList.set(data.data);
        
      }
    });
  }

  removeItem(id:string):void{
    this._WishlistService.deleteProductFromWish(id).subscribe({
      next:(res)=>{
        console.log(res.data);
    
        this.wishList.set(res.data);
        
        this._ToastrService.success(res.message, 'Remove item')
        
        
      }
    })
  }

  addItemToCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        
        this._CartService.cartNumber.set(res.numOfCartItems)
        this._ToastrService.success(res.message, 'Add item to cart');
        
      }
    })
  }
 

  

}

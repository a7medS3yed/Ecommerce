
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, FormsModule,RouterLink,NgClass ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit  {

  
private readonly _ProductsService = inject(ProductsService);
productsList:WritableSignal<Iproducts[]> = signal([]);
textSearch:string = "";
private readonly _ToastrService = inject(ToastrService)
private readonly _WishlistService = inject(WishlistService)
private readonly _CartService = inject(CartService);

  // Track wishlist using a Set
  wishlist: Set<string> = new Set<string>();

  


ngOnInit(): void {

   // Retrieve wishlist from localStorage when the component is initialized
   const storedWishlist = localStorage.getItem('wishlist');
   if (storedWishlist) {
     this.wishlist = new Set<string>(JSON.parse(storedWishlist));
   }

  this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productsList.set(res.data)
      
    }
  })
}


 // function for add item to cart and call function for api from service 
 addItemToCart(id:string){
   this._CartService.addProductToCart(id).subscribe({
     next: (res) => {
       console.log(res);
       this._CartService.cartNumber.set(res.numOfCartItems)
 
       this._ToastrService.success(res.message, 'Add Product');
     },
     error: (error) =>{
       console.error(error);
     }
   })
  }
 
 
  addItemToWish(id:string){

    if (!this.wishlist.has(id)) {
      this.wishlist.add(id);   
    }

    // Update the localStorage with the new wishlist state
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));


     this._WishlistService.addProductToWish(id).subscribe({
       next:(res)=>{
         console.log('wish:::', res);
         this._ToastrService.success(res.message, 'Add to wish list')
       }
     })
  }
 
  // Check if a product is in the wishlist
  isInWishlist(id: string): boolean {
    return this.wishlist.has(id);
  }

}

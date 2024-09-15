import { Subscription } from 'rxjs';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalies',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './detalies.component.html',
  styleUrl: './detalies.component.scss'
})
export class DetaliesComponent implements OnInit , OnDestroy {
 

  private readonly _ActivatedRoute= inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private  getProductIdSub !: Subscription; 
  private getSpecificProductSub !: Subscription
  detaliesList:Iproducts | null = null;
  ngOnInit(): void {

   this.getProductIdSub =  this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('id');
      this.getSpecificProductSub =   this._ProductsService.getSpecificProduct(productId).subscribe({
          next: (product) => this.detaliesList = product.data,
          error: (error) => console.error(error)
        })
      }


    })
    
  }

  ngOnDestroy(): void {
    this.getProductIdSub?.unsubscribe();
    this.getSpecificProductSub?.unsubscribe();
  }

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

  customOptionsDetalies: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }

}

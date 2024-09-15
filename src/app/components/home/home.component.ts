import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproducts } from '../../core/interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CarouselModule, RouterLink, SearchPipe, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    items: 1,
    nav: true
  };
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 3000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  };

  private readonly _ProductsService = inject(ProductsService);
  productsList: Iproducts[] = [];
  private getAllProductsSub!: Subscription;
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: Icategories[] = [];
  private getAllCategoriesSub!: Subscription;
  textSearch: string = "";
  private readonly _CartService = inject(CartService);
  addItemToCartSub!: Subscription;
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishlistService = inject(WishlistService);

  // Track wishlist using a Set
  wishlist: Set<string> = new Set<string>();

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    // Retrieve wishlist from localStorage when the component is initialized
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      this.wishlist = new Set<string>(JSON.parse(storedWishlist));
    }

    this.getAllCategoriesSub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        this._NgxSpinnerService.hide();
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
      },
      error: (err) => { console.error(err); }
    });
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSub?.unsubscribe();
    this.getAllProductsSub?.unsubscribe();
    this.addItemToCartSub?.unsubscribe();
  }

  // Add item to cart
  addItemToCart(id: string) {
    this.addItemToCartSub = this._CartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.cartNumber.set(res.numOfCartItems);
        this._ToastrService.success(res.message, 'Add Product');
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  // Add item to wishlist and toggle state
  addItemToWish(id: string) {
    if (!this.wishlist.has(id)) {
      this.wishlist.add(id);   
    }

    // Update the localStorage with the new wishlist state
    localStorage.setItem('wishlist', JSON.stringify(Array.from(this.wishlist)));

    this._WishlistService.addProductToWish(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Add to wish list');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // Check if a product is in the wishlist
  isInWishlist(id: string): boolean {
    return this.wishlist.has(id);
  }
}

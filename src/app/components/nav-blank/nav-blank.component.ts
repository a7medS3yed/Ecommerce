import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthserviceService } from '../../core/services/authservice.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
  

  _AuthserviceService = inject(AuthserviceService);
  _CartService = inject(CartService);
  
  navCartCount:Signal<number> = computed(()=> this._CartService.cartNumber()  )

  ngOnInit(): void {

    this._CartService.getCart().subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems)
        
      }
    })



  }

}

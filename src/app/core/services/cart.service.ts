import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environmets } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  // cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)
  cartNumber:WritableSignal<number> = signal(0)

  
 

  // fucntion for add product to cart with api
  addProductToCart(id:string):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/cart`,
      {
         "productId": id
      }
    )
  }

  // fuction for get cart with api
  getCart():Observable<any>{
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/cart`
    )
  }

  // function for delete item  from cart with api
  deleteItemFromCart(id:string):Observable<any>{
    return this._HttpClient.delete(`${environmets.baseUrl}/api/v1/cart/${id}`
    );
  }

  // fuction for update item from cart with api
  updateItemFromCart(id:string,quantity:number):Observable<any>{
    return this._HttpClient.put(`${environmets.baseUrl}/api/v1/cart/${id}`,
      {
        "count": quantity
      }
    )
    }

  // fuction for clear cart with api
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environmets.baseUrl}/api/v1/cart`
    )
  }

}

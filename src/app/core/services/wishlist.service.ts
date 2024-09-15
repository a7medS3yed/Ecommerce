import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmets } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private readonly _HttpClient:HttpClient) { }

  addProductToWish(id:string):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/wishlist`,
      {
        "productId": id
      }
    )
  }


  getProductsFromWish():Observable<any>{
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/wishlist`)
  }


  deleteProductFromWish(id:string):Observable<any>{
    return this._HttpClient.delete(`${environmets.baseUrl}/api/v1/wishlist/${id}`);
  }
  
   
}

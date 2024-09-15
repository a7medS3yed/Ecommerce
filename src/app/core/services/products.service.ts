import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmets } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient); 

  getAllProducts():Observable<any>{ // api for return all products
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/products`);
  }


  getSpecificProduct(id: string | null):Observable<any>{ // api for return specific product
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/products/${id}`);
  }
}

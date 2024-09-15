import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmets } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private readonly _HttpClient:HttpClient) { }

  cheackOut(id:string|null, shippingDetalis:object):Observable<any>{
    return this._HttpClient.post(`${environmets.baseUrl}/api/v1/orders/checkout-session/${id}?url=${environmets.serverUrl}`,
      {
        "shippingAddress":shippingDetalis
      }
    )
  }
}

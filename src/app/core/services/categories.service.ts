import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmets } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient:HttpClient) { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/categories`)
  }
  
  getSpesificCategories(id:string):Observable<any>{
    return this._HttpClient.get(`${environmets.baseUrl}/api/v1/categories/${id}`)
  }
}

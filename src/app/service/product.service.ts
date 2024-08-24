import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products.model';
import { API_URL } from '../constant/app.constant';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = API_URL; // Update with your backend API URL

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`);
  }
}

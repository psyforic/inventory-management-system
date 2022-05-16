import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/v1/products/';

  constructor(private httpClient: HttpClient) {}
  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseUrl);
  }
  createProduct(data: Product): Observable<Object> {
    return this.httpClient.post<Product>(`${this.baseUrl}`, data);
  }
  getProductById(id: number): Observable<Product>
  {
    return this.httpClient.get<Product>(this.baseUrl+id)
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.baseUrl +id, product);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(this.baseUrl+id);
  }
}

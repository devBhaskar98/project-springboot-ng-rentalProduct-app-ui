import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {API_URL} from '../constant/app.constant';
import {PageRequestDTO, Product, ProductPaginatedResponse} from '@rentalproduct/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = API_URL; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`);
  }

  getProductsPaginated(pageRequestDto: PageRequestDTO): Observable<ProductPaginatedResponse> {
    const body: PageRequestDTO = {
      pageNo: pageRequestDto.pageNo,
      pageSize: pageRequestDto.pageSize,
      sort: "ASC",
      sortByColumn: pageRequestDto.sortByColumn
    };

    return this.http.post<ProductPaginatedResponse>(`${this.apiUrl}/product/page`, body);
  }

  getAllProductsDummy(): Observable<Product[]> {
    // Uncomment the line below to use the actual HTTP request
    // return this.http.get<Product[]>(`${this.apiUrl}/product/`);

    // Dummy response
    const dummyProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 100 },
      { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 150 },
      { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 200 },
    ];

    // return of(dummyProducts); // Return the dummy response as an observable
    return throwError(() => new Error('Failed to load products'));
  }


}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
}

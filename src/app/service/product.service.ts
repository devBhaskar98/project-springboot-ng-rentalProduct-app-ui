import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../constant/app.constant';
import {PageRequestDTO, Product} from '@rentalproduct/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = API_URL; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`);
  }

  getProductsPaginated(pageRequestDto: PageRequestDTO): Observable<any> {
    const body = {
      pageNo: pageRequestDto.pageNo,
      pageSize: pageRequestDto.pageSize,
    };

    return this.http.post<any>(`${this.apiUrl}/product/page`, body);
  }
}

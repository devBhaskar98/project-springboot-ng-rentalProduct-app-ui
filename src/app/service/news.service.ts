import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../constant/app.constant';
import {News} from '@rentalproduct/models';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getMockNews(): Observable<News[]> {
    return this.http.get<News[]>('assets/mock_data/trending-news.json');
  }
}

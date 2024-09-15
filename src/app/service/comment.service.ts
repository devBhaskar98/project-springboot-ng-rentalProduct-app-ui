import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../constant/app.constant';
import { Comments } from '@rentalproduct/models';



@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = API_URL; // Update with your backend API URL

  constructor(private http: HttpClient) {}

  getComment(): Observable<Comments[]> {
    return this.http.get<Comments[]>(`${this.apiUrl}/comment/`);
  }


}

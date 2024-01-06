import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private baseUrl = 'http://localhost:3000/api/cases';

  constructor(private http: HttpClient) { }

  listCases(): Observable<any> {
    return this.http.get(`${this.baseUrl}/list`);
  }
}
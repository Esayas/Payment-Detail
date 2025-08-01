import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  createUser(formData: any) {
    return this.http.post(this.url + '/signup', formData);
  }
}

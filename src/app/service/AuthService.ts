import { HttpClient } from '@angular/common/http';
import ApplicationConst from '../constants/ApplicationConst';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthResponse from '../model/AuthResponse';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/auth';
@Injectable()
export default class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${baseUrl}/login`, {
      username,
      password,
    });
  }

  registration(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${baseUrl}/register`, {
      username,
      email,
      password,
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}

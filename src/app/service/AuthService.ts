import { HttpClient } from '@angular/common/http';
import ApplicationConst from '../constants/ApplicationConst';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthResponse from '../model/AuthResponse';
import User from '../model/User';
import OperationStatus from '../model/OperationStatus';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/auth';
@Injectable()
export default class AuthService {
  changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(`${baseUrl}/password/change`, {
      oldPassword,
      newPassword,
    });
  }
  constructor(private httpClient: HttpClient) {}

  me(): Observable<User> {
    return this.httpClient.get<User>(`${baseUrl}/me`);
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${baseUrl}/login`, {
      username,
      password,
    });
  }

  register(
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

  resetPasswordRequest(email: string): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(
      `${baseUrl}/password/reset/sendEmail`,
      {
        email,
      }
    );
  }

  resetPassword(token: string, password: string): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(`${baseUrl}/password/reset`, {
      resetToken: token,
      password,
    });
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isAdminAuthenticated() {
    const userStr: string = localStorage.getItem('user') || '{}';
    const user: User = JSON.parse(userStr);
    const isAdmin =
      user.authorityList &&
      user.authorityList.length > 0 &&
      user.authorityList[0].name === 'ADMINISTRATOR';
    return this.isLoggedIn() && isAdmin;
  }

  getUserFromLocal(): User {
    const userStr = localStorage.getItem('user');
    const user: User = JSON.parse(userStr ? userStr : '{}');
    return user;
  }
}

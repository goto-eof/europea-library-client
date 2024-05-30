import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CommonCursoredRequest from '../model/CommonCursoredRequest';
import User from '../model/User';
import { Observable } from 'rxjs';

const baseUrl = '/api/v1/user';
@Injectable()
export default class UserManagerService {
  constructor(private httpClient: HttpClient) {}

  getById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${baseUrl}/id/${userId}`);
  }

  enable(userId: number): Observable<User> {
    return this.httpClient.patch<User>(`${baseUrl}/enable/id/${userId}`, {
      enabled: true,
    });
  }

  disable(userId: number): Observable<User> {
    return this.httpClient.patch<User>(`${baseUrl}/enable/id/${userId}`, {
      enabled: false,
    });
  }

  getAllPaginated(commonCursoredRequest: CommonCursoredRequest) {
    return this.httpClient.post(`${baseUrl}`, commonCursoredRequest);
  }
}

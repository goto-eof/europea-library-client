import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import { Observable } from 'rxjs';
import OperationStatus from '../model/OperationStatus';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/cache';

@Injectable()
export default class CacheLoaderService {
  constructor(private httpClient: HttpClient) {}

  reload(): Observable<OperationStatus> {
    return this.httpClient.get<OperationStatus>(`${baseUrl}/reload`);
  }
}

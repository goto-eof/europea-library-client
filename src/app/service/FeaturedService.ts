import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import { Observable } from 'rxjs';
import OperationStatus from '../model/OperationStatus';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/featured';

@Injectable()
export default class FeaturedService {
  constructor(private httpClient: HttpClient) {}

  isFeatured(fileSystemItemId: number) {
    return this.httpClient.get<OperationStatus>(
      `${baseUrl}/isFeatured/${fileSystemItemId}`
    );
  }

  add(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(
      `${baseUrl}/add/${fileSystemItemId}`,
      {}
    );
  }

  remove(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(
      `${baseUrl}/remove/${fileSystemItemId}`,
      {}
    );
  }
}

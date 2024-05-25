import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OperationStatus from '../model/OperationStatus';

const baseUrl = '/api/v1/job';

@Injectable()
export default class JobService {
  constructor(private httpClient: HttpClient) {}

  stopJob() {
    return this.httpClient.get<OperationStatus>(`${baseUrl}/indexer/stop`);
  }

  isJobRunning(): Observable<OperationStatus> {
    return this.httpClient.get<OperationStatus>(`${baseUrl}/indexer/isRunning`);
  }

  runJob(): Observable<OperationStatus> {
    return this.httpClient.get<OperationStatus>(`${baseUrl}/indexer/run`);
  }
}

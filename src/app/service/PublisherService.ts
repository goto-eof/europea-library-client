import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ItemAndFrequency from '../model/ItemAndFrequency';
import Rename from '../model/Rename';
import { Observable } from 'rxjs';
import OperationStatus from '../model/OperationStatus';

const baseUrl = '/api/v1/publisher';

@Injectable()
export default class PublisherService {
  constructor(private httpClient: HttpClient) {}

  getPublishers() {
    return this.httpClient.get<Array<ItemAndFrequency>>(`${baseUrl}`);
  }

  rename(oldName: string, newName: string): Observable<OperationStatus> {
    const payload: Rename = {
      oldName,
      newName,
    };
    return this.httpClient.post<OperationStatus>(`${baseUrl}/rename`, payload);
  }
}

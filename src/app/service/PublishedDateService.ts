import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApplicationConst from '../constants/ApplicationConst';
import OperationStatus from '../model/OperationStatus';
import Rename from '../model/Rename';
import ItemAndFrequency from '../model/ItemAndFrequency';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/publishedDate';

@Injectable()
export default class PublishedDateService {
  constructor(private httpClient: HttpClient) {}

  getPublishedDates() {
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

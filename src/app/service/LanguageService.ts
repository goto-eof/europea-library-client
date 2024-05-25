import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ItemAndFrequency from '../model/ItemAndFrequency';
import OperationStatus from '../model/OperationStatus';
import { Observable } from 'rxjs';
import Rename from '../model/Rename';

const baseUrl = '/api/v1/language';

@Injectable()
export default class LanguageService {
  constructor(private httpClient: HttpClient) {}

  getLanguages() {
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

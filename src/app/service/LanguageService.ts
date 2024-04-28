import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import ItemAndFrequency from '../model/ItemAndFrequency';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/language';

@Injectable()
export default class LanguageService {
  constructor(private httpClient: HttpClient) {}

  getLanguages() {
    return this.httpClient.get<Array<ItemAndFrequency>>(`${baseUrl}`);
  }
}

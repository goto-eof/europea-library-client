import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import ItemAndFrequency from '../model/ItemAndFrequency';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/publisher';

@Injectable()
export default class PublisherService {
  constructor(private httpClient: HttpClient) {}

  getPublishers() {
    return this.httpClient.get<Array<ItemAndFrequency>>(`${baseUrl}`);
  }
}

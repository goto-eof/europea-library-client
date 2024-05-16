import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import { Observable } from 'rxjs';
import StripeCustomer from '../model/StripeCustomer';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/stripe/customer';

@Injectable()
export default class CustomerService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<StripeCustomer> {
    return this.httpClient.get<StripeCustomer>(`${baseUrl}`);
  }

  create(stripeCustomer: StripeCustomer): Observable<StripeCustomer> {
    return this.httpClient.post<StripeCustomer>(`${baseUrl}`, stripeCustomer);
  }

  update(stripeCustomer: StripeCustomer): Observable<StripeCustomer> {
    return this.httpClient.put<StripeCustomer>(`${baseUrl}`, stripeCustomer);
  }
}

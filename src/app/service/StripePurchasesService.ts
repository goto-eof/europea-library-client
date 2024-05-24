import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import GenericCursoredResponse from '../model/GenericCursoredResponse';
import StripeCustomerProductsOwned from '../model/StripeCustomerProductsOwned';
import GenericCursoredRequest from '../model/GenericCursoredRequest';

const baseUrl = '/api/v1/stripe/purchases';

@Injectable({ providedIn: 'root' })
export class StripePurchasesService {
  constructor(private httpClient: HttpClient) {}

  retrieveCursoredPurchases(
    payload: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, StripeCustomerProductsOwned>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, StripeCustomerProductsOwned>
    >(`${baseUrl}/cursored`, payload);
  }
}

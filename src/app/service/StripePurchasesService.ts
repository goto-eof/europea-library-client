import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import SearchFileSystemItemRequest from '../model/SearchFileSystemItemRequest';
import ApplicationConst from '../constants/ApplicationConst';
import { HttpClient } from '@angular/common/http';
import GenericCursoredResponse from '../model/GenericCursoredResponse';
import StripeCustomerProductsOwned from '../model/StripeCustomerProductsOwned';
import GenericCursoredRequest from '../model/GenericCursoredRequest';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/stripe/purchases';

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

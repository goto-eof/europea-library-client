import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import StripeCheckoutSessionRequest from '../model/StripeCheckoutSessionRequest';
import StripeCheckoutSessionResponse from '../model/StripeCheckoutSessionResponse';
import OperationStatus from '../model/OperationStatus';

const baseUrl = '/api/v1/payment';

@Injectable()
export default class PaymentService {
  constructor(private httpClient: HttpClient) {}

  initCheckoutSession(
    stripeCheckoutSessionRequest: StripeCheckoutSessionRequest
  ): Observable<StripeCheckoutSessionResponse> {
    return this.httpClient.post<StripeCheckoutSessionResponse>(
      `${baseUrl}/initCheckoutSession`,
      stripeCheckoutSessionRequest
    );
  }

  isCheckoutCompleted(
    ongoingPurchaseSessionId: number
  ): Observable<OperationStatus> {
    return this.httpClient.get<OperationStatus>(
      `${baseUrl}/checkPurchaseSessionStatus/${ongoingPurchaseSessionId}`
    );
  }

  cancelCheckoutSession(
    ongoingPurchaseSessionId: number
  ): Observable<OperationStatus> {
    return this.httpClient.put<OperationStatus>(
      `${baseUrl}/cancel/ongoingPurchaseSessionId/${ongoingPurchaseSessionId}`,
      {}
    );
  }
}

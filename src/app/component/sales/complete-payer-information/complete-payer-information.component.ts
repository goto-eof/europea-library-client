import { Component, OnInit } from '@angular/core';
import PaymentService from '../../../service/PaymentService';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutSessionResponse from '../../../model/StripeCheckoutSessionResponse';
import SnackBarService from '../../../service/SnackBarService';
import { Location } from '@angular/common';
import BookInfo from '../../../model/BookInfo';
import FileMetaInfo from '../../../model/FileMetaInfo';
import StripePrice from '../../../model/StripePrice';

@Component({
  selector: 'app-complete-payer-information',
  templateUrl: './complete-payer-information.component.html',
  styleUrl: './complete-payer-information.component.css',
})
export class CompletePayerInformationComponent implements OnInit {
  paymentInfo?: any;
  callback: Function;
  bookInfo?: BookInfo;
  fileMetaInfo?: FileMetaInfo;
  stripePrice?: StripePrice;

  constructor(
    private paymentService: PaymentService,
    private snackBarService: SnackBarService,
    private location: Location
  ) {
    this.callback = this.continue;
  }
  ngOnInit(): void {
    const state = this.location.getState() as any;
    this.paymentInfo = state['data'];
    this.bookInfo = this.paymentInfo?.bookInfo;
    this.fileMetaInfo = this.paymentInfo?.fileMetaInfo;
    this.stripePrice = this.paymentInfo.stripePrice;
  }
  continue(resolve: Function): void {
    if (!this.paymentInfo) {
      this.snackBarService.showErrorWithMessage(
        'Something went wrong. Payment information not available.'
      );
      resolve(true);
      return;
    }
    this.paymentService.initCheckoutSession(this.paymentInfo).subscribe({
      error: (err) => {
        this.snackBarService.showErrorWithMessage(
          'Unable to proceed. Before proceeding, please complete the form and save changes.'
        );
        resolve(true);
      },
      next: async (data: StripeCheckoutSessionResponse) => {
        const stripe = await loadStripe(data.stripePublicKey);

        stripe!
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then((data: any) => {
            resolve(true);
          });
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import PaymentService from '../../../service/PaymentService';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutSessionResponse from '../../../model/StripeCheckoutSessionResponse';
import SnackBarService from '../../../service/SnackBarService';
import { state } from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-complete-payee-information',
  templateUrl: './complete-payee-information.component.html',
  styleUrl: './complete-payee-information.component.css',
})
export class CompletePayeeInformationComponent implements OnInit {
  paymentInfo?: any;
  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}
  ngOnInit(): void {
    const state = this.location.getState() as any;
    this.paymentInfo = state['data'];
  }
  continue() {
    if (!this.paymentInfo) {
      this.snackBarService.showErrorWithMessage(
        'Something went wrong. Payment information not available.'
      );
      return;
    }
    this.paymentService.initCheckoutSession(this.paymentInfo).subscribe({
      error: (err) => {
        this.snackBarService.showErrorWithMessage(
          'Unable to proceed. Before proceeding, please complete the form and save changes.'
        );
      },
      next: async (data: StripeCheckoutSessionResponse) => {
        const stripe = await loadStripe(data.stripePublicKey);
        stripe!
          .redirectToCheckout({
            sessionId: data.sessionId,
          })
          .then((data: any) => {});
      },
    });
  }
}

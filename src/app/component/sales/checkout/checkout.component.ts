import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import PaymentService from '../../../service/PaymentService';
import SnackBarService from '../../../service/SnackBarService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  success: 'yes' | 'no' | 'checking' = 'checking';
  intervalId?: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        const ongoingPurchaseSessionId = params['ongoingPurchaseSessionId'];
        const success: boolean = params['success'] === 'true';
        if (success) {
          this.checkingOut(+ongoingPurchaseSessionId);
        } else {
          this.paymentService
            .cancelCheckoutSession(+ongoingPurchaseSessionId)
            .subscribe({
              next: () => {
                this.snackBarService.showInfoWithMessage(
                  'Payment canceled successfully'
                );
                this.router.navigate(['/home']);
              },
              error: () => {
                this.snackBarService.showErrorWithMessage(
                  'Internal server error'
                );
                this.router.navigate(['/home']);
              },
            });
        }
      },
    });
  }

  goToOwnedProducts() {
    const that = this;
    setTimeout(() => {
      that.router.navigate(['/customer/purchases']);
    }, 5000);
  }

  checkingOut(ongoingPurchaseSessionId: number) {
    const that = this;
    this.intervalId = window.setInterval(function () {
      that.paymentService
        .isCheckoutCompleted(ongoingPurchaseSessionId!)
        .subscribe({
          next: (status) => {
            if (status.status) {
              that.success = 'yes';
              clearInterval(that.intervalId);
              that.goToOwnedProducts();
            }
          },
          error: () => {
            that.success = 'no';
            clearInterval(that.intervalId);
            that.goToOwnedProducts();
          },
        });
    }, 1000);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import StripeCustomer from '../../model/StripeCustomer';
import CustomerService from '../../service/CustomerService';

@Component({
  selector: 'app-stripe-customer-information-editor',
  templateUrl: './stripe-customer-information-editor.component.html',
  styleUrl: './stripe-customer-information-editor.component.css',
})
export class StripeCustomerInformationEditorComponent implements OnInit {
  customerForm: FormGroup<any> = this.generateForm(undefined);
  stripeCustomer?: StripeCustomer;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerService.get().subscribe({
      next: (data) => {
        this.reload(data);
      },
    });
  }

  private reload(data: StripeCustomer) {
    this.stripeCustomer = data;
    this.customerForm = this.generateForm(data);
  }

  generateForm(stripeCustomer: StripeCustomer | undefined) {
    return this.formBuilder.group({
      firstName: [stripeCustomer?.firstName],
      lastName: [stripeCustomer?.lastName],
      email: [stripeCustomer?.email],
      city: [stripeCustomer?.currentStripeCustomerAddress?.city],
      country: [stripeCustomer?.currentStripeCustomerAddress?.country],
      postalCode: [stripeCustomer?.currentStripeCustomerAddress?.postalCode],
      state: [stripeCustomer?.currentStripeCustomerAddress?.state],
      line1: [stripeCustomer?.currentStripeCustomerAddress?.line1],
      line2: [stripeCustomer?.currentStripeCustomerAddress?.line2],
    });
  }

  submitForm() {
    const stripeCustomer: StripeCustomer = {
      id: this.stripeCustomer?.id,
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      email: this.customerForm.value.email,
      currentStripeCustomerAddress: {
        id: this.stripeCustomer?.currentStripeCustomerAddress?.id,
        city: this.customerForm.value.city,
        country: this.customerForm.value.country,
        postalCode: this.customerForm.value.postalCode,
        state: this.customerForm.value.state,
        line1: this.customerForm.value.line1,
        line2: this.customerForm.value.line2,
      },
    };
    if (this.stripeCustomer?.id) {
      this.customerService.update(stripeCustomer).subscribe({
        next: (data) => {
          this.reload(data);
        },
      });
      return;
    }
    this.customerService.create(stripeCustomer).subscribe({
      next: (data) => {
        this.reload(data);
      },
    });
  }
}
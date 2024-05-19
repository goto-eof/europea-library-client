import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../../../service/AuthService';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../service/NavigationService';
import SnackBarService from '../../../service/SnackBarService';
import OperationStatus from '../../../model/OperationStatus';

@Component({
  selector: 'app-password-reset-email-form',
  templateUrl: './password-reset-email-form.component.html',
  styleUrl: './password-reset-email-form.component.css',
})
export class PasswordResetEmailFormComponent {
  emailForm: FormGroup<any> = this.formBuilder.group({
    email: ['', Validators.maxLength(320)],
    token: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute
  ) {}

  async submitForm() {
    if (this.emailForm.valid) {
      await this.authService
        .resetPasswordRequest(this.emailForm.value.email.trim().toLowerCase())
        .subscribe({
          next: (operationStatus: OperationStatus) => {
            this.snackBarService.showInfoWithMessage(operationStatus.message);
            this.router.navigate(['/home']);
          },
          error: (e: any) => {
            if (e.error.code == 400) {
              this.snackBarService.showErrorWithMessage(
                'Something went wrong when trying to reset your password: ' +
                  e.error.message
              );
              return;
            }
            this.snackBarService.showErrorWithMessage(
              'Something went wrong when trying to reset your password :('
            );
            localStorage.removeItem('token');
          },
        });
    } else {
      this.snackBarService.showErrorWithMessage(
        'Malformed email. Please check the text helper.'
      );
    }
  }
}

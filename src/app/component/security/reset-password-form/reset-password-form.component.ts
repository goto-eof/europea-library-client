import { Component, OnInit } from '@angular/core';
import OperationStatus from '../../../model/OperationStatus';
import { FormBuilder, FormGroup } from '@angular/forms';
import FormValidatorService from '../../../service/FormValidatorService';
import AuthService from '../../../service/AuthService';
import { ActivatedRoute, Router } from '@angular/router';
import SnackBarService from '../../../service/SnackBarService';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css',
})
export class ResetPasswordFormComponent implements OnInit {
  resetPasswordForm: FormGroup<any> = this.formBuilder.group({
    token: [''],
    password: ['', FormValidatorService.getPasswordValidator()],
    repeatPassword: ['', FormValidatorService.getPasswordValidator()],
  });

  isShowPasswordEnabled = false;
  isShowRepeatPasswordEnabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const token: string | null = map.get('token');
      if (!token) {
        this.snackBarService.showErrorWithMessage('Invalid one-shot token');
        this.router.navigate(['/home']);
        return;
      }
      this.resetPasswordForm.patchValue({ token });
    });
  }

  toggleIsShowPasswordEnabled() {
    this.isShowPasswordEnabled = !this.isShowPasswordEnabled;
  }

  toggleIsShowRepeatPasswordEnabled() {
    this.isShowRepeatPasswordEnabled = !this.isShowRepeatPasswordEnabled;
  }

  async submitForm(e: any) {
    e.preventDefault();

    if (
      this.resetPasswordForm.valid &&
      this.resetPasswordForm.value.password ===
        this.resetPasswordForm.value.repeatPassword
    ) {
      await this.authService
        .resetPassword(
          this.resetPasswordForm.value.token,
          this.resetPasswordForm.value.password
        )
        .subscribe({
          next: (authResponse: OperationStatus) => {
            if (authResponse.status) {
              this.snackBarService.showInfoWithMessage(
                'Password reseted successfully :)'
              );
              this.router.navigate(['/login']);
              return;
            }
            this.snackBarService.showErrorWithMessage('Wrong token?');
          },
          error: () => {
            this.snackBarService.showErrorWithMessage(
              'Something went wrong when trying to reset the password. Wrong token?'
            );
          },
        });
    } else {
      this.snackBarService.showErrorWithMessage('Invalid form');
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import FormValidatorService from '../../../service/FormValidatorService';
import AuthService from '../../../service/AuthService';
import { Router } from '@angular/router';
import SnackBarService from '../../../service/SnackBarService';
import OperationStatus from '../../../model/OperationStatus';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrl: './change-password-form.component.css',
})
export class ChangePasswordFormComponent {
  changePasswordForm: FormGroup<any> = this.formBuilder.group({
    oldPassword: ['', FormValidatorService.getPasswordValidator()],
    password: ['', FormValidatorService.getPasswordValidator()],
    repeatPassword: ['', FormValidatorService.getPasswordValidator()],
  });

  isShowOldPasswordEnabled = false;
  isShowPasswordEnabled = false;
  isShowRepeatPasswordEnabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  toggleIsShowOldPasswordEnabled() {
    this.isShowOldPasswordEnabled = !this.isShowOldPasswordEnabled;
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
      this.changePasswordForm.valid &&
      this.changePasswordForm.value.password ===
        this.changePasswordForm.value.repeatPassword
    ) {
      await this.authService
        .changePassword(
          this.changePasswordForm.value.oldPassword,
          this.changePasswordForm.value.password
        )
        .subscribe({
          next: (authResponse: OperationStatus) => {
            if (authResponse.status) {
              this.snackBarService.showInfoWithMessage(
                'Password changed successfully :)'
              );
              this.router.navigate(['/home']);
              return;
            }
            this.snackBarService.showErrorWithMessage('Wrong old password?');
          },
          error: () => {
            this.snackBarService.showErrorWithMessage(
              'Something went wrong when trying to change the password. Wrong old password?'
            );
          },
        });
    } else {
      this.snackBarService.showErrorWithMessage('Invalid password');
    }
  }
}

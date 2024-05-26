import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../../../service/AuthService';
import { Router } from '@angular/router';
import AuthResponse from '../../../model/AuthResponse';
import {
  NavigationService,
  UPDATE_NAV_BAR_AFTER_LOGIN,
} from '../../../service/NavigationService';
import SnackBarService from '../../../service/SnackBarService';
import FormValidatorService from '../../../service/FormValidatorService';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup<any> = this.formBuilder.group({
    username: ['', FormValidatorService.getUsernameValidator()],
    password: ['', FormValidatorService.getPasswordValidator()],
    email: ['', Validators.maxLength(320)],
    consensus1Flag: [false],
    consensus2Flag: [false],
    consensus3Flag: [false],
  });
  isShowPasswordEnabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  toggleIsShowPasswordEnabled() {
    this.isShowPasswordEnabled = !this.isShowPasswordEnabled;
  }

  async submitForm() {
    if (this.registrationForm.valid) {
      await this.authService
        .register(
          this.registrationForm.value.username.trim().toLowerCase(),
          this.registrationForm.value.email.trim().toLowerCase(),
          this.registrationForm.value.password,
          this.registrationForm.value.consensus1Flag,
          this.registrationForm.value.consensus2Flag,
          this.registrationForm.value.consensus3Flag
        )
        .subscribe({
          next: (authResponse: AuthResponse) => {
            localStorage.setItem('token', authResponse.token);
            this.authService.me().subscribe({
              next: (me) => {
                const user = JSON.stringify(me);
                localStorage.setItem('user', user);
                this.navigationService.setValue(UPDATE_NAV_BAR_AFTER_LOGIN);
                this.snackBarService.showInfoWithMessage(
                  'Logged in successfully :)'
                );
                this.router.navigate(['/home']);
              },
              error: (e) => {
                this.snackBarService.showErrorWithMessage(
                  'Something went wrong when trying to authenticate :('
                );
              },
            });
          },
          error: (e) => {
            if (e.error.code == 400) {
              this.snackBarService.showErrorWithMessage(
                'Something went wrong when trying to register: ' +
                  e.error.message
              );
              return;
            }
            this.snackBarService.showErrorWithMessage(
              'Something went wrong when trying to register :('
            );
            localStorage.removeItem('token');
          },
        });
    } else {
      this.snackBarService.showErrorWithMessage(
        'Malformed username, email or password. Please check the text helper.'
      );
    }
  }
}

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
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
    private snackBarService: SnackBarService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  toggleIsShowPasswordEnabled() {
    this.isShowPasswordEnabled = !this.isShowPasswordEnabled;
  }

  submitForm(): Promise<boolean> {
    return new Promise<boolean>((resolve, _) => {
      this.registrationFlow(resolve);
    });
  }

  registrationFlow(resolve: Function) {
    if (this.registrationForm.valid) {
      this.recaptchaV3Service.execute('register').subscribe({
        next: (token) => {
          this.register(resolve, token);
        },
        error: (_) => {
          this.snackBarService.showErrorWithMessage('Registration error');
          resolve(true);
        },
      });
    } else {
      this.snackBarService.showErrorWithMessage(
        'Malformed username, email or password. Please check the text helper.'
      );
      resolve(true);
    }
  }

  register(resolve: Function, token: string) {
    this.authService
      .register(
        token,
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
              resolve(true);
            },
            error: (_) => {
              this.snackBarService.showErrorWithMessage(
                'Something went wrong when trying to authenticate :('
              );
              resolve(true);
            },
          });
        },
        error: (e) => {
          if (e.error.code == 400) {
            this.snackBarService.showErrorWithMessage(
              'Something went wrong when trying to register: ' + e.error.message
            );
            resolve(true);
            return;
          }
          this.snackBarService.showErrorWithMessage(
            'Something went wrong when trying to register :('
          );
          localStorage.removeItem('token');
          resolve(true);
        },
      });
  }
}

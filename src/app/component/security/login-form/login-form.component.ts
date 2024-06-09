import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../../../service/AuthService';
import AuthResponse from '../../../model/AuthResponse';
import { Router } from '@angular/router';
import {
  NavigationService,
  UPDATE_NAV_BAR_AFTER_LOGIN,
} from '../../../service/NavigationService';
import SnackBarService from '../../../service/SnackBarService';
import FormValidatorService from '../../../service/FormValidatorService';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup<any> = this.formBuilder.group({
    username: ['', FormValidatorService.getUsernameValidator()],
    password: ['', FormValidatorService.getPasswordValidator()],
  });
  isShowPasswordEnabled = false;
  clientToken?: string;
  siteKey = environment.googleReCaptchaSiteKey;

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
      this.loginFlow(resolve);
    });
  }

  async loginFlow(resolve: Function) {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username.trim().toLowerCase();
      if (!username) {
        this.snackBarService.showErrorWithMessage('Invalid username');
        resolve(true);
        return;
      }

      this.recaptchaV3Service.execute('login').subscribe({
        next: (token) => {
          this.login(resolve, token, username, this.loginForm.value.password);
        },
        error: (_) => {
          this.snackBarService.showErrorWithMessage('Authentication error');
          resolve(true);
        },
      });
    } else {
      this.snackBarService.showErrorWithMessage('Invalid username or password');
      resolve(true);
    }
  }

  login(resolve: Function, token: string, username: string, password: string) {
    this.authService.login(token, username, password).subscribe({
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
          error: () => {
            this.snackBarService.showInfoWithMessage('Application Error');
            resolve(true);
          },
        });
      },
      error: (e) => {
        if (e.error.code === 401) {
          this.snackBarService.showErrorWithMessage(
            'Incorrect username or password'
          );
          resolve(true);
          return;
        }
        if (e.name === 'HttpErrorResponse') {
          this.snackBarService.showErrorWithMessage(
            'Are you connected to internet?'
          );
          resolve(true);
          return;
        }
        this.snackBarService.showErrorWithMessage('Wrong username or password');
        localStorage.removeItem('token');
        resolve(true);
      },
    });
  }

  goToPasswordResetEmailForm() {
    this.router.navigate(['/password/reset']);
  }
}

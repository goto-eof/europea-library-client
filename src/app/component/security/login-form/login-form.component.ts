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
    clientToken: ['', Validators.minLength(10)],
  });
  isShowPasswordEnabled = false;
  siteKeyCaptcha: string = environment.googleReCaptchaSiteKey;
  clientToken?: string;
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
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username.trim().toLowerCase();
      if (!username) {
        this.snackBarService.showErrorWithMessage('Invalid username');
        return;
      }
      await this.authService
        .login(username, this.loginForm.value.password)
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
              error: () => {
                this.snackBarService.showInfoWithMessage('Application Error');
              },
            });
          },
          error: (e) => {
            if (e.error.code === 401) {
              this.snackBarService.showErrorWithMessage(
                'Incorrect username or password'
              );
              return;
            }
            if (e.name === 'HttpErrorResponse') {
              this.snackBarService.showErrorWithMessage(
                'Are you connected to internet?'
              );
              return;
            }
            this.snackBarService.showErrorWithMessage(
              'Wrong username or password'
            );
            localStorage.removeItem('token');
          },
        });
    } else {
      this.snackBarService.showErrorWithMessage('Invalid username or password');
    }
  }

  goToPasswordResetEmailForm() {
    this.router.navigate(['/password/reset']);
  }
}

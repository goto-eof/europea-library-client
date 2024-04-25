import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../../service/AuthService';
import AuthResponse from '../../model/AuthResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginForm: FormGroup<any> = this.formBuilder.group({
    username: ['', Validators.maxLength(100)],
    password: ['', Validators.maxLength(100)],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async submitForm() {
    if (this.loginForm.valid) {
      await this.authService
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe({
          next: (authResponse: AuthResponse) => {
            console.log(authResponse);
            localStorage.setItem('token', authResponse.token);
            this.router.navigate(['/home']);
          },
          error: (e) => {
            console.error(e);
            localStorage.removeItem('token');
          },
        });
    }
  }
}

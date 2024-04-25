import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AuthService from '../../service/AuthService';
import { Router } from '@angular/router';
import AuthResponse from '../../model/AuthResponse';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  registrationForm: FormGroup<any> = this.formBuilder.group({
    username: ['', Validators.maxLength(100)],
    email: ['', Validators.maxLength(100)],
    password: ['', Validators.maxLength(100)],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  async submitForm() {
    if (this.registrationForm.valid) {
      await this.authService
        .registration(
          this.registrationForm.value.username,
          this.registrationForm.value.email,
          this.registrationForm.value.password
        )
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

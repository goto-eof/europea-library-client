import { Component } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from '../../service/AuthService';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrl: './navigator.component.css',
})
export class NavigatorComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}

import { Component, OnInit } from '@angular/core';
import AuthService from '../../../service/AuthService';
import { Router } from '@angular/router';
import { NavigationService } from '../../../service/NavigationService';
import { SHA256 } from 'crypto-js';
import User from '../../../model/User';
import SnackBarService from '../../../service/SnackBarService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  role: string = this.getRole() || '';
  username: string = this.getUsername() || '';
  gravatarImage: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationService: NavigationService,
    private snackBarService: SnackBarService
  ) {}
  ngOnInit(): void {
    this.navigationService.getObservable().subscribe({
      next: () => {
        this.role = this.getRole() || '';
        this.username = this.getUsername() || '';
        this.reloadGravatarImage();
      },
      error: () => {},
    });
  }

  reloadGravatarImage() {
    this.gravatarImage =
      'https://gravatar.com/avatar/' + SHA256(this.getEmail()) + '?s=32';
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        if (response.status) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.role = this.getRole() || '';
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.snackBarService.showErrorWithMessage(
          'Fatal Error! Unable to logout.'
        );
      },
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getRole() {
    const userStr = localStorage.getItem('user');
    const user: User = JSON.parse(userStr ? userStr : '{}');
    return user.authorityList && user.authorityList.length > 0
      ? user.authorityList[0].name
      : null;
  }

  getUsername() {
    const userStr = localStorage.getItem('user');
    const user: User = JSON.parse(userStr ? userStr : '{}');
    return user.username;
  }

  getEmail() {
    const userStr = localStorage.getItem('user');
    const user: User = JSON.parse(userStr ? userStr : '{}');
    return user.email;
  }
}

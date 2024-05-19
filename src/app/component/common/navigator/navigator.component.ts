// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import AuthService from '../../../service/AuthService';
// import User from '../../../model/User';
// import { NavigationService } from '../../../service/NavigationService';
// import sha256 from 'crypto-js/sha256';
// @Component({
//   selector: 'app-navigator',
//   templateUrl: './navigator.component.html',
//   styleUrl: './navigator.component.css',
// })
// export class NavigatorComponent implements OnInit {
//   role: string = this.getRole() || '';
//   username: string = this.getUsername() || '';
//   gravatarImage: string = '';
//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private navigationService: NavigationService
//   ) {}
//   ngOnInit(): void {
//     this.navigationService.getObservable().subscribe({
//       next: () => {
//         this.role = this.getRole() || '';
//         this.username = this.getUsername() || '';
//         this.reloadGravatarImage();
//       },
//       error: () => {},
//     });
//   }

//   reloadGravatarImage() {
//     this.gravatarImage =
//       'https://gravatar.com/avatar/' + sha256(this.getEmail()) + '?s=32';
//   }

//   logout() {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     this.role = this.getRole() || '';
//     this.router.navigate(['/home']);
//   }

//   isLoggedIn() {
//     return this.authService.isLoggedIn();
//   }

//   getRole() {
//     const userStr = localStorage.getItem('user');
//     const user: User = JSON.parse(userStr ? userStr : '{}');
//     return user.authorityList && user.authorityList.length > 0
//       ? user.authorityList[0].name
//       : null;
//   }

//   getUsername() {
//     const userStr = localStorage.getItem('user');
//     const user: User = JSON.parse(userStr ? userStr : '{}');
//     return user.username;
//   }

//   getEmail() {
//     const userStr = localStorage.getItem('user');
//     const user: User = JSON.parse(userStr ? userStr : '{}');
//     return user.email;
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-account',
  templateUrl: './cp-account.component.html',
  styleUrl: './cp-account.component.css',
})
export class CpAccountComponent {
  constructor(private router: Router) {}
  gotoChangePassword() {
    this.router.navigate(['/password/change']);
  }
}

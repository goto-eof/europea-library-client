import { Component, OnInit } from '@angular/core';
import User from '../../../model/User';
import AuthService from '../../../service/AuthService';

@Component({
  selector: 'app-cp-profile',
  templateUrl: './cp-profile.component.html',
  styleUrl: './cp-profile.component.css',
})
export class CpProfileComponent implements OnInit {
  user?: User;
  roles: Array<string> = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromLocal();
    this.user = user;
    this.roles = user?.authorityList?.map((auth) => auth.name);
  }
}

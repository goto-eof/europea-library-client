import { Component, Input, OnInit } from '@angular/core';
import User from '../../../../model/User';
import GravatarService from '../../../../service/GravatarService';
import UserManagerService from '../../../../service/UserManagerService';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent implements OnInit {
  @Input('user') user!: User;
  avatarUrl?: string;

  constructor(
    private gravatarService: GravatarService,
    private userManagerService: UserManagerService
  ) {}

  ngOnInit(): void {
    this.loadGravatarURL();
  }

  loadGravatarURL() {
    this.avatarUrl = this.gravatarService.getAvatarURI(this.user.email, 128);
  }

  disable() {
    this.userManagerService.disable(this.user.id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }

  enable() {
    this.userManagerService.enable(this.user.id).subscribe({
      next: (user) => {
        this.user = user;
      },
    });
  }
}

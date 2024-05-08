import { Component, OnInit } from '@angular/core';
import PostService from '../../service/PostService';
import Post from '../../model/Post';
import { environment } from '../../../environments/environment';
import SnackBarService from '../../service/SnackBarService';
import AuthService from '../../service/AuthService';
import { Router } from '@angular/router';
import ApplicationSettingsService from '../../service/ApplicationSettingsService';
import ApplicationSettings from '../../model/ApplicationSettings';

@Component({
  selector: 'app-custom-home-page',
  templateUrl: './custom-home-page.component.html',
  styleUrl: './custom-home-page.component.css',
})
export class CustomHomePageComponent implements OnInit {
  post?: Post;
  settings?: ApplicationSettings;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private applicationSettingsService: ApplicationSettingsService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.applicationSettingsService.get().subscribe({
      next: (settings) => {
        this.settings = settings;
        this.postService
          .getByIdentifier(environment.IDENTIFIER_HOME_PAGE_ARTICLE)
          .subscribe({
            next: (post) => {
              this.post = post;
            },
            error: () => {
              if (!this.isAdministrator()) {
                this.router.navigate(['/about']);
              }
            },
          });
      },
      error: () => {
        this.snackBarService.showErrorWithMessage(
          'Something went wrong. Please contact the administrator.'
        );
      },
    });
  }

  isAdministrator() {
    return this.authService.isAdminAuthenticated();
  }
}

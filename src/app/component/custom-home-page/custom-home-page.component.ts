import { Component, OnInit } from '@angular/core';
import PostService from '../../service/PostService';
import Post from '../../model/Post';
import { environment } from '../../../environments/environment';
import SnackBarService from '../../service/SnackBarService';
import AuthService from '../../service/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-home-page',
  templateUrl: './custom-home-page.component.html',
  styleUrl: './custom-home-page.component.css',
})
export class CustomHomePageComponent implements OnInit {
  post?: Post;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
  }

  isAdministrator() {
    return this.authService.isAdminAuthenticated();
  }
}

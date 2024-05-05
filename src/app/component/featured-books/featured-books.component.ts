import { Component, OnInit } from '@angular/core';
import FeaturedService from '../../service/FeaturedService';
import SnackBarService from '../../service/SnackBarService';
import { environment } from '../../../environments/environment';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import FileSystemItemHighlight from '../../model/FileSystemItemHighlight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-books',
  templateUrl: './featured-books.component.html',
  styleUrl: './featured-books.component.css',
})
export class FeaturedBooksComponent implements OnInit {
  genericCursoredResponse?: GenericCursoredResponse<
    string,
    FileSystemItemHighlight
  >;

  constructor(
    private featuredService: FeaturedService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.featuredService
      .retrieveCursoredHighlight({
        limit: 8,
        parent: 'featured',
        nextCursor: null,
      })
      .subscribe({
        next: (data) => {
          this.genericCursoredResponse = data;
        },
        error: () => {
          this.snackBarService.showErrorWithMessage(
            'Unable to load featured books'
          );
        },
      });
  }

  goToItem(id: number) {
    this.router.navigate([`/file-info/${id}`]);
  }
}

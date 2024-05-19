import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../../model/GenericCursoredResponse';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import FileSystemItemHighlight from '../../../model/FileSystemItemHighlight';
import SnackBarService from '../../../service/SnackBarService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-latest-books',
  templateUrl: './latest-books.component.html',
  styleUrl: './latest-books.component.css',
})
export class LatestBooksComponent implements OnInit {
  genericCursoredResponse?: GenericCursoredResponse<
    string,
    FileSystemItemHighlight
  >;

  constructor(
    private cursoredFileSystemService: CursoredFileSystemService,
    private snackBarService: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoredFileSystemService
      .retrieveNewCursoredHighlight({
        limit: 4,
        parent: 'featured',
        nextCursor: null,
      })
      .subscribe({
        next: (data) => {
          data.childrenList.map((item) => {
            item.description = item.description
              ? item.description.length > 150
                ? item.description.substring(0, 150) + '...'
                : item.description
              : '';

            item.title = item.title
              ? item.title.length > 50
                ? item.title.substring(0, 50) + '...'
                : item.title
              : '';

            return item;
          });
          this.genericCursoredResponse = data;
        },
        error: () => {
          // this.snackBarService.showErrorWithMessage(
          //   'Unable to load featured books'
          // );
        },
      });
  }

  calculateImageUrl(item: FileSystemItemHighlight): string {
    console.log(item);
    if (item.imageUrl) {
      return item.imageUrl;
    }
    return '/assets/images/no-cover.jpg';
  }

  goToItem(id: number) {
    this.router.navigate([`/file-info/${id}`]);
  }
}

import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import GenericCursoredRequest from '../../model/GenericCursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';

@Component({
  selector: 'app-cursored-by-rating-file-explorer',
  templateUrl: './cursored-by-rating-file-explorer.component.html',
  styleUrl: './cursored-by-rating-file-explorer.component.css',
})
export class CursoredByRatingFileExplorerComponent implements OnInit {
  cursoredItem?: GenericCursoredResponse<string, FileSystemItem>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.cursoredFileSystemService
      .listByRating({
        limit: environment.LIMIT_EXPLORER_BY_RATING,
        nextCursor: null,
        parent: 'rating',
      })
      .subscribe({
        next: (cursoredItem) => {
          this.cursoredItem = cursoredItem;
        },
        error: (e) => {
          ErrorHandlerUtil.handleError(e, this.router);
        },
      });
  }

  loadMore() {
    const cursoredRequest: GenericCursoredRequest<string> = {
      limit: environment.LIMIT_EXPLORER_BY_RATING,
      nextCursor: this.cursoredItem?.nextCursor!,
      parent: this.cursoredItem?.parent!,
    };
    this.cursoredFileSystemService.listByRating(cursoredRequest).subscribe({
      next: (cursoredItem) => {
        this.cursoredItem!.childrenList = [
          ...this.cursoredItem!.childrenList,
          ...cursoredItem.childrenList,
        ];
        this.cursoredItem!.nextCursor = cursoredItem.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  listDirectory(file: FileSystemItem) {
    if (file.isDirectory) {
      this.router.navigate([`/explorer/${file.id}`]);
      return;
    }
    // file.parent = file;
    const extras: NavigationExtras = {
      state: {
        fileSystemItem: file,
      },
    };
    this.router.navigate([`/file-info/${file.id}`], extras);
  }
}

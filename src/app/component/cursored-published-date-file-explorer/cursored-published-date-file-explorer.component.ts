import { Component } from '@angular/core';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import GenericCursoredRequest from '../../model/GenericCursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';

@Component({
  selector: 'app-cursored-published-date-file-explorer',
  templateUrl: './cursored-published-date-file-explorer.component.html',
  styleUrl: './cursored-published-date-file-explorer.component.css',
})
export class CursoredPublishedDateFileExplorerComponent {
  cursoredItem?: GenericCursoredResponse<string, FileSystemItem>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let parent = params.get('parent');
      if (parent) {
        this.cursoredFileSystemService
          .listByPublishedDate({
            limit: environment.LIMIT_EXPLORER_BY_PUBLISHED_DATE,
            nextCursor: null,
            parent: parent,
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
    });
  }

  loadMore() {
    const cursoredRequest: GenericCursoredRequest<string> = {
      limit: environment.LIMIT_EXPLORER_BY_LANGUAGE,
      nextCursor: this.cursoredItem?.nextCursor!,
      parent: this.cursoredItem?.parent!,
    };
    this.cursoredFileSystemService
      .listByPublishedDate(cursoredRequest)
      .subscribe({
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

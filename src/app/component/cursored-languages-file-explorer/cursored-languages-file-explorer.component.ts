import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import GenericCursoredRequest from '../../model/GenericCursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cursored-languages-file-explorer',
  templateUrl: './cursored-languages-file-explorer.component.html',
  styleUrl: './cursored-languages-file-explorer.component.css',
})
export class CursoredLanguagesFileExplorerComponent implements OnInit {
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
          .listByLanguage({
            limit: environment.LIMIT_EXPLORER_BY_LANGUAGE,
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
    this.cursoredFileSystemService.listByLanguage(cursoredRequest).subscribe({
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

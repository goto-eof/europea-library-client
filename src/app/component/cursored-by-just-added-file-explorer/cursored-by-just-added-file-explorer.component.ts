import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import GenericCursoredRequest from '../../model/GenericCursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';
import GenericCursoredRequestByFileType from '../../model/GenericCursoredRequestByFileType';

@Component({
  selector: 'app-cursored-by-just-added-file-explorer',
  templateUrl: './cursored-by-just-added-file-explorer.component.html',
  styleUrl: './cursored-by-just-added-file-explorer.component.css',
})
export class CursoredByJustAddedFileExplorerComponent implements OnInit {
  cursoredItem?: GenericCursoredResponse<string, FileSystemItem>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoredFileSystemService: CursoredFileSystemService,
    private cursoredFileSystemItemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.cursoredFileSystemItemService
      .retrieveNewCursored({
        limit: environment.LIMIT_EXPLORER_BY_JUST_ADDED,
        nextCursor: null,
        parent: 'Just Added',
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
    const cursoredRequest: GenericCursoredRequestByFileType<string> = {
      limit: environment.LIMIT_EXPLORER_BY_RATING,
      nextCursor: this.cursoredItem?.nextCursor!,
      parent: this.cursoredItem?.parent!,
    };
    this.cursoredFileSystemItemService
      .retrieveNewCursored(cursoredRequest)
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

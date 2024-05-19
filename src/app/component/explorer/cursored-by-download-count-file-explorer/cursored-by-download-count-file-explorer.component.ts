import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import { environment } from '../../../../environments/environment';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import GenericCursoredRequest from '../../../model/GenericCursoredRequest';
import FileSystemItem from '../../../model/FileSystemItem';

@Component({
  selector: 'app-cursored-by-download-count-file-explorer',
  templateUrl: './cursored-by-download-count-file-explorer.component.html',
  styleUrl: './cursored-by-download-count-file-explorer.component.css',
})
export class CursoredByDownloadCountFileExplorerComponent implements OnInit {
  cursoredItem?: GenericCursoredResponse<string, FileSystemItem>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoredFileSystemService: CursoredFileSystemService,
    private cursoredFileSystemItemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.cursoredFileSystemItemService
      .retrieveCursoredByDownloadCount({
        limit: environment.LIMIT_EXPLORER_BY_DOWNLOAD_COUNT,
        nextCursor: null,
        parent: 'DownloadCounter',
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
    this.cursoredFileSystemItemService
      .retrieveCursoredByDownloadCount(cursoredRequest)
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

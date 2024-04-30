import { Component } from '@angular/core';
import CursoredTag from '../../model/CursoredTag';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import FileSystemService from '../../service/FileSystemService';
import CursoredRequest from '../../model/CursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cursored-tag-file-explorer',
  templateUrl: './cursored-tag-file-explorer.component.html',
  styleUrl: './cursored-tag-file-explorer.component.css',
})
export class CursoredTagFileExplorerComponent {
  cursoredTag?: CursoredTag;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fileSystemService: FileSystemService,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let tagId = params.get('id');
      if (tagId) {
        this.cursoredFileSystemService
          .listByTag({
            limit: environment.LIMIT_EXPLORER_BY_TAG,
            nextCursor: null,
            parentId: +tagId,
          })
          .subscribe({
            next: (cursoredTag) => {
              this.cursoredTag = cursoredTag;
            },
            error: (e) => {
              ErrorHandlerUtil.handleError(e, this.router);
            },
          });
      }
    });
  }

  loadMore() {
    const cursoredRequest: CursoredRequest = {
      limit: environment.LIMIT_EXPLORER_BY_TAG,
      nextCursor: this.cursoredTag?.nextCursor!,
      parentId: this.cursoredTag?.tag.id!,
    };
    this.cursoredFileSystemService.listByTag(cursoredRequest).subscribe({
      next: (cursoredTag) => {
        this.cursoredTag!.childrenList = [
          ...this.cursoredTag!.childrenList,
          ...cursoredTag.childrenList,
        ];
        this.cursoredTag!.nextCursor = cursoredTag.nextCursor;
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredCategory from '../../../model/CursoredCategory';
import CursoredRequest from '../../../model/CursoredRequest';
import FileSystemItem from '../../../model/FileSystemItem';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cursored-category-file-explorer',
  templateUrl: './cursored-category-file-explorer.component.html',
  styleUrl: './cursored-category-file-explorer.component.css',
})
export class CursoredCategoryFileExplorerComponent implements OnInit {
  cursoredCategory?: CursoredCategory;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let categoryId = params.get('id');
      if (categoryId) {
        this.cursoredFileSystemService
          .listByCategory({
            limit: environment.LIMIT_EXPLORER_BY_CATEGORY,
            nextCursor: null,
            parentId: +categoryId,
          })
          .subscribe({
            next: (cursoredCategory) => {
              this.cursoredCategory = cursoredCategory;
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
      limit: environment.LIMIT_EXPLORER_BY_CATEGORY,
      nextCursor: this.cursoredCategory?.nextCursor!,
      parentId: this.cursoredCategory?.category.id!,
    };
    this.cursoredFileSystemService.listByCategory(cursoredRequest).subscribe({
      next: (cursoredCategory) => {
        this.cursoredCategory!.childrenList = [
          ...this.cursoredCategory!.childrenList,
          ...cursoredCategory.childrenList,
        ];
        this.cursoredCategory!.nextCursor = cursoredCategory.nextCursor;
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

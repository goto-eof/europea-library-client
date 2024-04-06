import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import FileSystemService from '../../service/FileSystemService';
import CursoredCategory from '../../model/CursoredCategory';
import CursoredRequest from '../../model/CursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';

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
    private fileSystemService: FileSystemService,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let categoryId = params.get('id');
      if (categoryId) {
        this.cursoredFileSystemService
          .listByCategory({
            limit: 10,
            nextCursor: null,
            parentId: +categoryId,
          })
          .subscribe((cursoredCategory) => {
            this.cursoredCategory = cursoredCategory;
          });
      }
    });
  }

  loadMore() {
    const cursoredRequest: CursoredRequest = {
      limit: 10,
      nextCursor: this.cursoredCategory?.nextCursor!,
      parentId: this.cursoredCategory?.category.id!,
    };
    this.cursoredFileSystemService
      .listByCategory(cursoredRequest)
      .subscribe((cursoredCategory) => {
        this.cursoredCategory!.childrenList = [
          ...this.cursoredCategory!.childrenList,
          ...cursoredCategory.childrenList,
        ];
        this.cursoredCategory!.nextCursor = cursoredCategory.nextCursor;
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

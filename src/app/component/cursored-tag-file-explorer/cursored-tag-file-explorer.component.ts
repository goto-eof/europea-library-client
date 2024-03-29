import { Component } from '@angular/core';
import CursoredTag from '../../model/CursoredTag';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import FileSystemService from '../../service/FileSystemService';
import CursoredRequest from '../../model/CursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';

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
    private fileSystemService: FileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let tagId = params.get('id');
      if (tagId) {
        this.fileSystemService
          .listByTag({
            limit: 10,
            nextCursor: null,
            parentId: +tagId,
          })
          .subscribe((cursoredTag) => {
            this.cursoredTag = cursoredTag;
          });
      }
    });
  }

  loadMore() {
    const cursoredRequest: CursoredRequest = {
      limit: 10,
      nextCursor: this.cursoredTag?.nextCursor!,
      parentId: this.cursoredTag?.tag.id!,
    };
    this.fileSystemService
      .listByTag(cursoredRequest)
      .subscribe((cursoredTag) => {
        this.cursoredTag!.childrenList = [
          ...this.cursoredTag!.childrenList,
          ...cursoredTag.childrenList,
        ];
        this.cursoredTag!.nextCursor = cursoredTag.nextCursor;
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

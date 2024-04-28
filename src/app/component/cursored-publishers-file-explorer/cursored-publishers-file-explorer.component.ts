import { Component, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../model/GenericCursoredResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import GenericCursoredRequest from '../../model/GenericCursoredRequest';
import FileSystemItem from '../../model/FileSystemItem';

@Component({
  selector: 'app-cursored-publishers-file-explorer',
  templateUrl: './cursored-publishers-file-explorer.component.html',
  styleUrl: './cursored-publishers-file-explorer.component.css',
})
export class CursoredPublishersFileExplorerComponent implements OnInit {
  cursoredItem?: GenericCursoredResponse<string>;

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
          .listByPublisher({
            limit: 10,
            nextCursor: null,
            parent: parent,
          })
          .subscribe((cursoredItem) => {
            this.cursoredItem = cursoredItem;
          });
      }
    });
  }

  loadMore() {
    const cursoredRequest: GenericCursoredRequest<string> = {
      limit: 10,
      nextCursor: this.cursoredItem?.nextCursor!,
      parent: this.cursoredItem?.parent!,
    };
    this.cursoredFileSystemService
      .listByPublisher(cursoredRequest)
      .subscribe((cursoredItem) => {
        this.cursoredItem!.childrenList = [
          ...this.cursoredItem!.childrenList,
          ...cursoredItem.childrenList,
        ];
        this.cursoredItem!.nextCursor = cursoredItem.nextCursor;
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

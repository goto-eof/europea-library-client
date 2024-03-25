import { Component, OnInit } from '@angular/core';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredRequest from '../../model/CursoredRequest';
import CursoredFileSystemItem from '../../model/CursoredFileSystemItem';

const NEW_CURSORED_FILE_SYSTEM_ITEM = {
  basePath: '/',
  isDirectory: true,
  nextCursor: null,
};

@Component({
  selector: 'app-cursored-explorer',
  templateUrl: './cursored-explorer.component.html',
  styleUrl: './cursored-explorer.component.css',
})
export class CursoredExplorerComponent implements OnInit {
  cursoredFileSystemItem: CursoredFileSystemItem = {
    ...NEW_CURSORED_FILE_SYSTEM_ITEM,
  };
  private parentId?: number;
  children: Array<FileSystemItem>;

  constructor(
    private cursoredFileSystemService: CursoredFileSystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.children = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let parentId = params.get('id');
        if (!parentId) {
          this.cursoredFileSystemService.list().subscribe({
            next: (cursoredFileSystemResponse) => {
              this.parentId = cursoredFileSystemResponse.parent?.id;
              this.cursoredFileSystemItem = cursoredFileSystemResponse;
              this.children = cursoredFileSystemResponse.childrenList || [];
            },
            error: (e) => {
              if (e.error.code === 503) {
                this.router.navigate(['/work-in-progress']);
                return;
              }
              if (e.error.code >= 500) {
                this.router.navigate(['/internal-server-error']);
              }
            },
          });
        } else {
          this.parentId = +parentId;
          this.children = [];
          this.cursoredFileSystemItem = { ...NEW_CURSORED_FILE_SYSTEM_ITEM };
          this.next();
        }
      },
    });
  }

  listDirectory(file: FileSystemItem) {
    if (file.isDirectory) {
      this.router.navigate([`/explorer/${file.id}`]);
      return;
    }
    file.parent = this.cursoredFileSystemItem.parent;
    const extras: NavigationExtras = {
      state: {
        fileSystemItem: file,
      },
    };
    this.router.navigate([`/file-info/${file.id}`], extras);
  }

  next() {
    const cursoredRequest: CursoredRequest = {
      parentId: this.parentId!,
      limit: 10,
      nextCursor: this.cursoredFileSystemItem.nextCursor,
    };
    this.cursoredFileSystemService.list(cursoredRequest).subscribe({
      next: (cursoredFileSystemItemResponse) => {
        this.cursoredFileSystemItem = cursoredFileSystemItemResponse;
        cursoredFileSystemItemResponse.childrenList?.forEach((child) =>
          this.children.push(child)
        );
      },
      error: () => {
        this.router.navigate(['/explorer']);
      },
    });
  }

  handleNext() {
    if (!this.cursoredFileSystemItem.nextCursor) {
      return;
    }
    this.next();
  }
}

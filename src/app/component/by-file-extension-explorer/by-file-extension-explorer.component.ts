import { Component, OnInit } from '@angular/core';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import CursoredFileSystemItemByExtension from '../../model/CursoredFileExtensionRequest';
import CursoredExtension from '../../model/CursoredExtension';
import FileSystemItem from '../../model/FileSystemItem';

@Component({
  selector: 'app-by-file-extension-explorer',
  templateUrl: './by-file-extension-explorer.component.html',
  styleUrl: './by-file-extension-explorer.component.css',
})
export class ByFileExtensionExplorerComponent implements OnInit {
  cursoredExtension?: CursoredExtension;

  constructor(
    private fileSystemItemService: CursoredFileSystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let extension = params.get('extension');
        if (!extension) {
          this.router.navigate(['/page-not-found']);
          return;
        }
        const payload: CursoredFileSystemItemByExtension = {
          extension,
          limit: 10,
          nextCursor: null,
        };
        this.fileSystemItemService
          .getCursoredFileSystemItemByExtension(payload)
          .subscribe({
            next: (data) => {
              this.cursoredExtension = data;
            },
            error: () => {},
          });
      },
    });
  }

  goToFile(fsi: FileSystemItem) {
    const extras: NavigationExtras = {
      state: {
        fileSystemItem: fsi,
      },
    };
    this.router.navigate([`/file-info/${fsi.id}`], extras);
  }

  more() {
    const payload: CursoredFileSystemItemByExtension = {
      extension: this.cursoredExtension!.extension,
      limit: 10,
      nextCursor: this.cursoredExtension!.nextCursor,
    };
    this.fileSystemItemService
      .getCursoredFileSystemItemByExtension(payload)
      .subscribe({
        next: (data) => {
          this.cursoredExtension!.childrenList = [
            ...this.cursoredExtension!.childrenList,
            ...data.childrenList,
          ];
          this.cursoredExtension!.nextCursor = data.nextCursor;
        },
        error: () => {},
      });
  }
}
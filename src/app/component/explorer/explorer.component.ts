import { Component, OnInit } from '@angular/core';
import FileSystemService from '../../service/FileSystemService';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css',
})
export class ExplorerComponent implements OnInit {
  file: FileSystemItem = {
    basePath: '/',
    isDirectory: true,
    downloadCount: 0,
  };

  constructor(
    private fileSystemService: FileSystemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let parentId = params.get('id');
        if (!parentId) {
          this.fileSystemService.list().subscribe({
            next: (file) => (this.file = file),
            error: (e) => {
              ErrorHandlerUtil.handleError(e, this.router);
            },
          });
        } else {
          this.fileSystemService.list(+parentId).subscribe({
            next: (file) => (this.file = file),
            error: () => {
              this.router.navigate(['/explorer']);
            },
          });
        }
      },
    });
  }

  listDirectory(file: FileSystemItem) {
    if (file.isDirectory) {
      this.router.navigate([`/explorer/${file.id}`]);
      return;
    }
    file.parent = this.file;
    const extras: NavigationExtras = {
      state: {
        fileSystemItem: file,
      },
    };
    this.router.navigate([`/file-info/${file.id}`], extras);
  }
}

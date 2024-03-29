import { Component, OnInit } from '@angular/core';
import FileSystemService from '../../service/FileSystemService';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css',
})
export class ExplorerComponent implements OnInit {
  file: FileSystemItem = {
    basePath: '/',
    isDirectory: true,
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

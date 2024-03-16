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
    this.activatedRoute.paramMap.subscribe((params) => {
      let parentId = params.get('id');
      if (!parentId) {
        this.fileSystemService.list().subscribe((file) => (this.file = file));
      } else {
        this.fileSystemService
          .list(+parentId)
          .subscribe((file) => (this.file = file));
      }
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

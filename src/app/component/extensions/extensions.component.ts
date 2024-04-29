import { Component, OnInit } from '@angular/core';
import FileExtension from '../../model/FileExtension';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { Router } from '@angular/router';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.css',
})
export class ExtensionsComponent implements OnInit {
  extensions?: Array<FileExtension>;

  constructor(
    private fileSystemItemService: CursoredFileSystemService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fileSystemItemService.getExtensions().subscribe({
      next: (data) => {
        this.extensions = data;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }
  exploreExtension(fileExtension: FileExtension) {
    this.router.navigate([`/explore/extension/${fileExtension.extension}`]);
  }
}

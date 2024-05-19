import { Component, OnInit } from '@angular/core';
import FileExtension from '../../../model/FileExtension';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import { Router } from '@angular/router';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrl: './extensions.component.css',
})
export class ExtensionsComponent implements OnInit {
  extensions?: Array<FileExtension>;
  allItems?: Array<FileExtension>;
  filter: string = '';

  constructor(
    private fileSystemItemService: CursoredFileSystemService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.fileSystemItemService.getExtensions().subscribe({
      next: (data) => {
        this.extensions = data;
        this.allItems = data;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }
  exploreExtension(fileExtension: FileExtension, that: ExtensionsComponent) {
    that.router.navigate([`/explore/extension/${fileExtension.name}`]);
  }

  filterItems() {
    const filterString = this.filter.trim().toLocaleLowerCase();
    if (!filterString) {
      this.extensions = this.allItems;
      return;
    }
    this.extensions = this.allItems?.filter(
      (item) => item.name.trim().toLocaleLowerCase().indexOf(filterString) > -1
    );
  }
}

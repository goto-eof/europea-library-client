import { Component, OnInit } from '@angular/core';
import FileExtension from '../../model/FileExtension';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { ActivatedRoute, Router } from '@angular/router';

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
    this.fileSystemItemService.getExtensions().subscribe((data) => {
      this.extensions = data;
    });
  }
  exploreExtension(fileExtension: FileExtension) {
    this.router.navigate([`/explore/extension/${fileExtension.extension}`]);
  }
}

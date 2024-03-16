import { Component, Input, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import FileMetaInfoBook from '../../model/FileMetaInfoBook';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrl: './file-info.component.css',
})
export class FileInfoComponent implements OnInit {
  // @Input({ required: true })
  // fileSystemItem!: FileSystemItem;
  bookInfo?: FileMetaInfoBook;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private bookInfoService: BookInfoService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const fileSystemItemId: string | null = map.get('fileSystemItemId');
      if (fileSystemItemId) {
        this.bookInfoService
          .retrieveByFileSystemId(+fileSystemItemId)
          .subscribe((data) => {
            this.bookInfo = data;
          });
      }
    });
  }
}

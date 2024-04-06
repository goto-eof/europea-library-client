import { Component, Input, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import FileMetaInfoBook from '../../model/FileMetaInfoBook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import Category from '../../model/Category';
import Tag from '../../model/Tag';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrl: './file-info.component.css',
})
export class FileInfoComponent implements OnInit {
  // @Input({ required: true })
  // fileSystemItem!: FileSystemItem;
  bookInfo?: FileMetaInfoBook;
  fileSystemItem?: FileSystemItem;
  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private bookInfoService: BookInfoService,
    private cursoredFileSystemService: CursoredFileSystemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const fileSystemItemId: string | null = map.get('fileSystemItemId');
      if (fileSystemItemId) {
        this.cursoredFileSystemService.get(+fileSystemItemId).subscribe({
          error: () => {
            this.loadFileSystemItem();
          },
          next: (fsi: FileSystemItem) => {
            this.fileSystemItem = fsi;
          },
        });
        this.loadBookInfo(fileSystemItemId);
      }
    });
    window.scrollTo(0, 0);
  }

  private loadBookInfo(fileSystemItemId: string) {
    this.bookInfoService.retrieveByFileSystemId(+fileSystemItemId).subscribe({
      next: (data) => {
        this.bookInfo = data;
      },
      error: () => {
        this.router.navigate(['/page-not-found']);
      },
    });
  }

  private loadFileSystemItem() {
    const state = this.location.getState() as any;
    const fileSystemItem: FileSystemItem = state[
      'fileSystemItem'
    ] as FileSystemItem;
    this.fileSystemItem = fileSystemItem;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  goToExplorer(fileSystemItem: FileSystemItem) {
    this.router.navigate([`/explorer/${fileSystemItem.id}`]);
  }

  goToCategory(category: Category) {
    this.router.navigate([`/explorer/category/${category.id}`]);
  }

  goToTag(tag: Tag) {
    this.router.navigate([`/explorer/tag/${tag.id}`]);
  }

  download() {
    if (!this.fileSystemItem || this.fileSystemItem.isDirectory) {
      return;
    }
    this.cursoredFileSystemService
      .download(this.fileSystemItem!.id!)
      .subscribe({
        next: (data: any) => {
          const a = document.createElement('a');
          document.body.appendChild(a);
          const blob: any = new Blob([data], {
            type: 'octet/stream',
          });
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = this.fileSystemItem!.name!;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.router.navigate(['/page-not-found']);
        },
      });
  }
}

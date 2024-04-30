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
import { SearchService } from '../../service/SearchService';
import SearchFileSystemItemRequest from '../../model/SearchFileSystemItemRequest';
import AuthService from '../../service/AuthService';
import QRCodeService from '../../service/QRCodeService';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrl: './file-info.component.css',
})
export class FileInfoComponent implements OnInit {
  bookInfo?: FileMetaInfoBook;
  fileSystemItem?: FileSystemItem;
  base64DownloadQRCode?: string;
  isDownloading: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private bookInfoService: BookInfoService,
    private cursoredFileSystemService: CursoredFileSystemService,
    private searchService: SearchService,
    private authService: AuthService,
    private qrCodeService: QRCodeService
  ) {}

  isAdminAuthenticated(): any {
    return this.authService.isAdminAuthenticated();
  }

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
            this.qrCodeService
              .retrieveDownloadLink(fsi.id!)
              .subscribe((binaryImage) => {
                this.base64DownloadQRCode =
                  this._arrayBufferToBase64(binaryImage);
              });
          },
        });
        this.loadBookInfo(fileSystemItemId);
      }
    });
    window.scrollTo(0, 0);
  }

  private _arrayBufferToBase64(buffer: ArrayBuffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
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
    this.isDownloading = true;
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
          this.isDownloading = false;
        },
        error: (e: any) => {
          if (e.status !== 401) {
            this.router.navigate(['/page-not-found']);
          }
          this.isDownloading = false;
        },
      });
  }

  searchByAuthor() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      author: this.bookInfo?.authors,
    };
    this.search(searchFileSystemItemRequest);
  }

  searchByIsbn10() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      isbn: this.bookInfo?.isbn10,
    };
    this.search(searchFileSystemItemRequest);
  }

  searchByIsbn13() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      isbn: this.bookInfo?.isbn13,
    };
    this.search(searchFileSystemItemRequest);
  }

  searchByPublisher() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      publisher: this.bookInfo?.publisher,
    };
    this.search(searchFileSystemItemRequest);
  }
  searchByTitle() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      title: this.bookInfo?.title,
    };
    this.search(searchFileSystemItemRequest);
  }

  searchByPublishedDate() {
    const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
      year: this.extractYear(this.bookInfo?.publishedDate),
    };
    this.search(searchFileSystemItemRequest);
  }

  extractYear(date?: string) {
    if (!date) {
      return;
    }
    const publishedDate = new Date(date);
    return publishedDate.getFullYear();
  }

  search(searchFileSystemItemRequest: SearchFileSystemItemRequest) {
    this.router.navigate(['/search']);
    this.searchService.setSearchFileSystemItemRequest(
      searchFileSystemItemRequest
    );
  }
  edit() {
    this.router.navigate([`/file-info/edit/${this.fileSystemItem!.id}`]);
  }
}

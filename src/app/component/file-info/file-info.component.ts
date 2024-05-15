import { Component, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import Category from '../../model/Category';
import Tag from '../../model/Tag';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { SearchService } from '../../service/SearchService';
import SearchFileSystemItemRequest from '../../model/SearchFileSystemItemRequest';
import AuthService from '../../service/AuthService';
import QRCodeService from '../../service/QRCodeService';
import FeaturedService from '../../service/FeaturedService';
import BookInfoConst from '../../constants/BookInfoConst';
import SnackBarService from '../../service/SnackBarService';
import BookInfo from '../../model/BookInfo';
import FileMetaInfo from '../../model/FileMetaInfo';
import StripeProduct from '../../model/StripeProduct';
import StripePrice from '../../model/StripePrice';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrl: './file-info.component.css',
})
export class FileInfoComponent implements OnInit {
  bookInfo?: BookInfo;
  fileMetaInfo?: FileMetaInfo;
  fileSystemItem?: FileSystemItem;
  stripeProduct?: StripeProduct;
  stripePrice?: StripePrice;
  base64DownloadQRCode?: string;
  isDownloading: boolean = false;
  isFeatured: boolean = false;
  isLocked: boolean = false;
  isHighlighted: boolean = false;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private bookInfoService: BookInfoService,
    private cursoredFileSystemService: CursoredFileSystemService,
    private searchService: SearchService,
    private authService: AuthService,
    private qrCodeService: QRCodeService,
    private featuredService: FeaturedService,
    private snackBarService: SnackBarService
  ) {}

  isAdminAuthenticated(): any {
    return this.authService.isAdminAuthenticated();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const fileSystemItemId: string | null = map.get('fileSystemItemId');
      if (fileSystemItemId) {
        if (this.isAdminAuthenticated()) {
          this.featuredService
            .isFeatured(+fileSystemItemId)
            .subscribe((operationStatus) => {
              this.isFeatured = operationStatus.status;
            });
          this.featuredService.isHighlight(+fileSystemItemId).subscribe({
            next: (operationstatus) => {
              this.isHighlighted = operationstatus.status;
            },
            error: () => {},
          });
        }
        this.cursoredFileSystemService.get(+fileSystemItemId).subscribe({
          error: () => {
            this.loadFileSystemItem();
          },
          next: (fsi: FileSystemItem) => {
            this.fileSystemItem = fsi;
            this.loadBookInfo(fsi);

            this.qrCodeService
              .retrieveDownloadLink(fsi.id!)
              .subscribe((binaryImage) => {
                this.base64DownloadQRCode =
                  this._arrayBufferToBase64(binaryImage);
              });
          },
        });
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

  private loadBookInfo(fileSystemItem: FileSystemItem) {
    this.fileMetaInfo = fileSystemItem?.fileMetaInfo!;
    this.bookInfo = fileSystemItem.fileMetaInfo?.bookInfo!;
    this.stripeProduct = fileSystemItem.fileMetaInfo?.stripeProduct;
    this.stripePrice = fileSystemItem.fileMetaInfo!.stripeProduct?.stripePrice;
    this.isLocked =
      fileSystemItem.fileMetaInfo!.bookInfo!.manualLock ===
        BookInfoConst.MANUAL_LOCK_LOCKED || false;
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
          this.fileSystemItem!.downloadCount++;
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
      title: this.fileMetaInfo!.title,
    };
    this.search(searchFileSystemItemRequest);
  }

  searchByLanguage() {
    this.router.navigate([`/explore/language/${this.bookInfo?.language}`]);
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

  setHighlighted() {
    if (this.fileSystemItem?.id) {
      this.featuredService.setHighlight(this.fileSystemItem!.id!).subscribe({
        next: (operationStatus) => {
          if (operationStatus.status) {
            this.snackBarService.showInfoWithMessage('saved');
            this.isHighlighted = true;
            return;
          }
          this.snackBarService.showErrorWithMessage('unable to save');
        },
        error: () => {
          this.snackBarService.showErrorWithMessage('unable to save');
        },
      });
    }
  }

  addRemoveFeatured() {
    if (!this.isAdminAuthenticated()) {
      return;
    }
    if (this.isFeatured) {
      this.featuredService
        .remove(this.fileSystemItem!.id!)
        .subscribe((operationStatus) => {
          if (operationStatus.status) {
            this.isFeatured = false;
            return;
          }
        });
      return;
    }
    this.featuredService
      .add(this.fileSystemItem!.id!)
      .subscribe((operationStatus) => {
        if (operationStatus.status) {
          this.isFeatured = true;
          return;
        }
      });
  }

  lockUnlock() {
    if (!this.isAdminAuthenticated()) {
      return;
    }
    if (this.isLocked) {
      this.bookInfoService.unlock(this.fileMetaInfo!.id!).subscribe(() => {
        this.isLocked = false;
      });
      return;
    }
    this.bookInfoService.lock(this.fileMetaInfo!.id!).subscribe(() => {
      this.isLocked = true;
    });
  }

  buy() {}
}

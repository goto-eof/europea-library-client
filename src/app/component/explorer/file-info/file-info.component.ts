import { Component, OnInit } from '@angular/core';
import FileSystemItem from '../../../model/FileSystemItem';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import BookInfoService from '../../../service/BookInfoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import Category from '../../../model/Category';
import Tag from '../../../model/Tag';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import { SearchService } from '../../../service/SearchService';
import SearchFileSystemItemRequest from '../../../model/SearchFileSystemItemRequest';
import AuthService from '../../../service/AuthService';
import QRCodeService from '../../../service/QRCodeService';
import FeaturedService from '../../../service/FeaturedService';
import BookInfoConst from '../../../constants/BookInfoConst';
import SnackBarService from '../../../service/SnackBarService';
import BookInfo from '../../../model/BookInfo';
import FileMetaInfo from '../../../model/FileMetaInfo';
import StripeProduct from '../../../model/StripeProduct';
import StripePrice from '../../../model/StripePrice';
import PaymentService from '../../../service/PaymentService';
import StripeCheckoutSessionRequest from '../../../model/StripeCheckoutSessionRequest';
import StripeCheckoutSessionResponse from '../../../model/StripeCheckoutSessionResponse';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';
import HttpErrorAdditionalInformation from '../../../model/HttpErrorAdditionalInformation';
import { InternalErrorCode } from '../../../types/InternalErrorCode';
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
  isPurchasing: boolean = false;
  isRedirecting: boolean = false;

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
    private snackBarService: SnackBarService,
    private paymentService: PaymentService
  ) {}

  isAdminAuthenticated(): any {
    return this.authService.isAdminAuthenticated();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const fileSystemItemId: string | null = map.get('fileSystemItemId');
      const fileMetaInfoId: string | null = map.get('fileMetaInfoId');
      if (fileSystemItemId) {
        this.manageCaseFileSystemIdPresent(+fileSystemItemId);
      } else if (fileMetaInfoId) {
        this.manageCaseFileMetaInfoIdPresent(+fileMetaInfoId);
      }
    });
    window.scrollTo(0, 0);
  }

  private manageCaseFileSystemIdPresent(fileSystemItemId: number) {
    this.manageCaseIsAdministrator(fileSystemItemId);
    this.cursoredFileSystemService.get(fileSystemItemId).subscribe({
      error: () => {
        this.loadFileSystemItem();
      },
      next: (fsi: FileSystemItem) => {
        this.fileSystemItem = fsi;
        this.loadBookInfo(fsi);

        this.qrCodeService
          .retrieveDownloadLink(fsi.id!)
          .subscribe((binaryImage) => {
            this.base64DownloadQRCode = this._arrayBufferToBase64(binaryImage);
          });
      },
    });
  }

  private manageCaseFileMetaInfoIdPresent(fileMetaInfoId: number) {
    this.cursoredFileSystemService
      .getByFileMetaInfoId(fileMetaInfoId)
      .subscribe({
        error: () => {
          this.loadFileSystemItem();
        },
        next: (fsi: FileSystemItem) => {
          this.fileSystemItem = fsi;
          this.loadBookInfo(fsi);
          this.manageCaseIsAdministrator(fsi.id!);
          this.qrCodeService
            .retrieveDownloadLink(fsi.id!)
            .subscribe((binaryImage) => {
              this.base64DownloadQRCode =
                this._arrayBufferToBase64(binaryImage);
            });
        },
      });
  }

  private manageCaseIsAdministrator(fileSystemItemId: number) {
    if (this.isAdminAuthenticated()) {
      this.featuredService
        .isFeatured(fileSystemItemId)
        .subscribe((operationStatus) => {
          this.isFeatured = operationStatus.status;
        });
      this.featuredService.isHighlight(fileSystemItemId).subscribe({
        next: (operationstatus) => {
          this.isHighlighted = operationstatus.status;
        },
        error: () => {},
      });
    }
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
    this.stripeProduct =
      fileSystemItem.fileMetaInfo?.stripePrice?.stripeProduct;
    this.stripePrice = fileSystemItem.fileMetaInfo!.stripePrice;
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
          if (e.status === 403) {
            this.snackBarService.showErrorWithMessage(
              'This e-book is for sale. Please purchase it in order to be able to download.'
            );
          } else if (e.status !== 401) {
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

  async buy() {
    this.isPurchasing = true;
    const stripeCheckoutSessionRequest: StripeCheckoutSessionRequest = {
      checkoutBaseUrl: `${environment.hostname}/checkout`,
      fileMetaInfoId: this.fileMetaInfo!.id!,
      quantity: 1,
    };
    this.paymentService
      .initCheckoutSession(stripeCheckoutSessionRequest)
      .subscribe({
        error: (err) => {
          const error = err.error as HttpErrorAdditionalInformation;
          this.isPurchasing = false;

          console.log(
            err,
            InternalErrorCode.MANDATORY_PAYEE_INFO,
            error.internalErrorCode
          );
          if (
            InternalErrorCode.MANDATORY_PAYEE_INFO === error.internalErrorCode
          ) {
            const paymentInfo = {
              checkoutBaseUrl: `${environment.hostname}/checkout`,
              fileMetaInfoId: this.fileMetaInfo!.id!,
              quantity: 1,
            };

            const navigationExtras: NavigationExtras = {
              state: {
                data: paymentInfo,
              },
            };
            this.router.navigate(
              ['/complete-payee-information'],
              navigationExtras
            );
          } else {
            this.snackBarService.showErrorWithMessage(
              'Before proceeding please fill up the Customer Information in Control Panel -> Payments section'
            );
          }
        },
        next: async (data: StripeCheckoutSessionResponse) => {
          this.isRedirecting = true;
          const stripe = await loadStripe(data.stripePublicKey);
          stripe!
            .redirectToCheckout({
              sessionId: data.sessionId,
            })
            .then((data: any) => {});
        },
      });
  }
}

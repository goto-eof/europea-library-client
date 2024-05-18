import { Component, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SnackBarService from '../../service/SnackBarService';
import FileMetaInfo from '../../model/FileMetaInfo';
import BookInfo from '../../model/BookInfo';
import StripeProduct from '../../model/StripeProduct';
import StripePrice from '../../model/StripePrice';
import FileMetaInfoService from '../../service/FileMetaInfoService';

@Component({
  selector: 'app-file-info-editor',
  templateUrl: './file-info-editor.component.html',
  styleUrl: './file-info-editor.component.css',
})
export class FileInfoEditorComponent implements OnInit {
  bookInfo?: BookInfo;
  fileMetaInfo?: FileMetaInfo;
  fileSystemItem?: FileSystemItem;
  stripeProduct?: StripeProduct;
  stripePrice?: StripePrice;
  editForm: FormGroup<any> = this.generateForm(undefined);
  salesForm: FormGroup<any> = this.generateSalesForm(undefined);
  managerForm: FormGroup<any> = this.generateManagerForm(undefined);
  filename = '';

  goToExplorer(fileSystemItem: FileSystemItem) {
    this.router.navigate([`/explorer/${fileSystemItem.id}`]);
  }

  generateSalesForm(fileMetaInfo: FileMetaInfo | undefined) {
    return this.formBuilder.group({
      name: [fileMetaInfo?.stripePrice?.stripeProduct?.name],
      description: [fileMetaInfo?.stripePrice?.stripeProduct?.description],
      amount: [fileMetaInfo?.stripePrice?.amount],
      currency: [fileMetaInfo?.stripePrice?.currency],
      onSale: [fileMetaInfo?.onSale],
    });
  }

  generateManagerForm(fileMetaInfo: FileMetaInfo | undefined) {
    return this.formBuilder.group({
      hidden: [fileMetaInfo?.hidden],
    });
  }

  generateForm(fileMetaInfo: FileMetaInfo | undefined) {
    return this.formBuilder.group({
      title: [fileMetaInfo?.title?.trim(), Validators.maxLength(512)],
      publisher: [
        fileMetaInfo?.bookInfo?.publisher?.trim(),
        [Validators.maxLength(100)],
      ],
      description: [
        fileMetaInfo?.description?.trim(),
        [Validators.maxLength(4000)],
      ],
      publishedDate: [
        fileMetaInfo?.bookInfo?.publishedDate?.trim(),
        [Validators.maxLength(50)],
      ],
      isbn10: [
        fileMetaInfo?.bookInfo?.isbn10?.trim(),
        [Validators.maxLength(10), Validators.minLength(10)],
      ],
      isbn13: [
        fileMetaInfo?.bookInfo?.isbn13?.trim(),
        [Validators.maxLength(13), Validators.minLength(13)],
      ],
      authors: [fileMetaInfo?.bookInfo?.authors, Validators.maxLength(500)],
      note: [fileMetaInfo?.bookInfo?.note?.trim(), Validators.maxLength(2000)],
      numberOfPages: fileMetaInfo?.bookInfo?.numberOfPages,
      language: [
        fileMetaInfo?.bookInfo?.language?.trim(),
        Validators.maxLength(10),
      ],
      categoryList: [
        fileMetaInfo?.bookInfo?.categoryList
          .map((category) => category.name.trim())
          .join(','),
        Validators.maxLength(1000),
      ],
      tagList: [
        fileMetaInfo?.tagList.map((tag) => tag.name.trim()).join(','),
        Validators.maxLength(1000),
      ],
      averageRating: [fileMetaInfo?.bookInfo?.averageRating],
      ratingsCount: [fileMetaInfo?.bookInfo?.ratingsCount],
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private bookInfoService: BookInfoService,
    private cursoredFileSystemService: CursoredFileSystemService,
    private fileMetaInfoService: FileMetaInfoService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((map) => {
      const fileSystemItemId: string | null = map.get('fileSystemItemId');
      if (fileSystemItemId) {
        this.retrieveFileSystemItem(+fileSystemItemId);
      }
    });
    window.scrollTo(0, 0);
  }

  submit() {
    this.submitForm();
  }

  submitForm(): void {
    this.update();
  }

  submitSalesForm(): void {}
  submitManagerForm(): void {}

  // private loadBookInfo(fileSystemItemId: string) {
  //   this.bookInfoService.retrieveByFileSystemId(+fileSystemItemId).subscribe({
  //     next: (data) => {
  //       this.bookInfo = data;
  //       this.editForm = this.generateForm(data);
  //       this.salesForm = this.generateSalesForm(data);
  //       this.managerForm = this.generateManagerForm(data);
  //     },
  //     error: () => {
  //       this.router.navigate(['/page-not-found']);
  //     },
  //   });
  // }

  private retrieveFileSystemItem(fileSystemItemId: number) {
    this.cursoredFileSystemService.get(fileSystemItemId).subscribe({
      error: () => {
        this.loadFileSystemItem();
      },
      next: (fsi: FileSystemItem) => {
        this.fileSystemItem = fsi;
        this.explode(fsi);
        this.editForm = this.generateForm(this.fileMetaInfo);
        this.salesForm = this.generateSalesForm(this.fileMetaInfo);
        this.managerForm = this.generateManagerForm(this.fileMetaInfo);
      },
    });
  }

  private explode(fileSystemItem: FileSystemItem) {
    this.fileSystemItem = fileSystemItem;
    this.fileMetaInfo = fileSystemItem.fileMetaInfo;
    this.bookInfo = fileSystemItem.fileMetaInfo?.bookInfo;
    this.stripeProduct =
      fileSystemItem.fileMetaInfo?.stripePrice?.stripeProduct;
    this.stripePrice = fileSystemItem.fileMetaInfo?.stripePrice;
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

  update() {
    if (this.editForm?.valid) {
      const fileMetaInfo: FileMetaInfo = {
        id: this.fileMetaInfo?.id,
        title: !!!this.editForm.value.title ? null : this.editForm.value.title,
        tagList: !!!this.editForm.value.tagList
          ? []
          : this.editForm.value.tagList
              .trim()
              .split(',')
              .map((tag: string) => {
                return {
                  name: tag,
                };
              }),
        description: !!!this.editForm.value.description
          ? null
          : this.editForm.value.description,
        onSale: this.salesForm.value.onSale || false,
        hidden: this.managerForm.value.hidden || false,
        bookInfo: {
          publisher: !!!this.editForm.value.publisher
            ? null
            : this.editForm.value.publisher,
          authors: !!!this.editForm.value.authors
            ? null
            : this.editForm.value.authors,

          publishedDate: !!!this.editForm.value.publishedDate
            ? null
            : this.editForm.value.publishedDate,
          isbn10: !!!this.editForm.value.isbn10
            ? null
            : this.editForm.value.isbn10,
          isbn13: !!!this.editForm.value.isbn13
            ? null
            : this.editForm.value.isbn13,
          imageUrl: undefined,
          language: !!!this.editForm.value.language
            ? null
            : this.editForm.value.language!,
          numberOfPages: !!!this.editForm.value.numberOfPages
            ? null
            : this.editForm.value.numberOfPages,
          note: !!!this.editForm.value.note! ? null : this.editForm.value.note,

          categoryList: !!!this.editForm.value.categoryList
            ? []
            : this.editForm.value.categoryList
                .trim()
                .split(',')
                .map((category: string) => {
                  return {
                    name: category,
                  };
                }),
          averageRating: this.editForm.value.averageRating,
          ratingsCount: this.editForm.value.ratingsCount,
        },
        stripePrice: {
          id: this.stripePrice?.id,
          amount: this.salesForm.value.amount,
          currency: this.salesForm.value.currency,
          stripeProduct: {
            id: this.stripeProduct?.id,
            name: this.salesForm.value.name,
            description: this.salesForm.value.description,
            fileMetaInfoId: this.fileMetaInfo!.id!,
          },
        },
      };
      this.fileMetaInfoService
        .update(this.fileMetaInfo!.id!, fileMetaInfo)
        .subscribe(() => {
          this.goToFileInfo();
        });
    } else {
    }
  }

  cancel() {
    this.goToFileInfo();
  }

  private goToFileInfo() {
    this.router.navigate([`/file-info/${this.fileSystemItem!.id}`]);
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.editForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onFileSelected(event: any) {
    event.preventDefault();
    const file: File = event.target.files[0];

    if (file) {
      this.filename = file.name;

      const formData = new FormData();

      formData.append('image', file);

      this.bookInfoService
        .uploadBookCover(this.fileMetaInfo!.id!, formData)
        .subscribe({
          next: (response) => {
            this.snackBarService.showInfoWithMessage(
              response.status ? 'Image uploaded successfully' : 'Server error'
            );
            this.loadBookInfoImageUrl(file);
          },
          error: () => {
            this.snackBarService.showErrorWithMessage(
              'failed to upload the book cover'
            );
          },
        });
    }
  }

  loadBookInfoImageUrl(file: File) {
    this.bookInfo!.imageUrl = URL.createObjectURL(file);
  }

  autofill() {
    this.salesForm.patchValue({ name: this.editForm.value.title });
    this.salesForm.patchValue({
      description: this.editForm.value.description,
    });
  }
}

import { Component, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import FileMetaInfoBook from '../../model/FileMetaInfoBook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SnackBarService from '../../service/SnackBarService';

@Component({
  selector: 'app-file-info-editor',
  templateUrl: './file-info-editor.component.html',
  styleUrl: './file-info-editor.component.css',
})
export class FileInfoEditorComponent implements OnInit {
  bookInfo?: FileMetaInfoBook;
  fileSystemItem?: FileSystemItem;
  editForm: FormGroup<any> = this.generateForm(undefined);
  filename = '';

  goToExplorer(fileSystemItem: FileSystemItem) {
    this.router.navigate([`/explorer/${fileSystemItem.id}`]);
  }

  generateForm(data: FileMetaInfoBook | undefined) {
    return this.formBuilder.group({
      title: [data?.title?.trim(), Validators.maxLength(512)],
      publisher: [data?.publisher?.trim(), [Validators.maxLength(100)]],
      description: [data?.description?.trim(), [Validators.maxLength(4000)]],
      publishedDate: [data?.publishedDate?.trim(), [Validators.maxLength(50)]],
      isbn10: [
        data?.isbn10?.trim(),
        [Validators.maxLength(10), Validators.minLength(10)],
      ],
      isbn13: [
        data?.isbn13?.trim(),
        [Validators.maxLength(13), Validators.minLength(13)],
      ],
      authors: [data?.authors, Validators.maxLength(500)],
      note: [data?.note?.trim(), Validators.maxLength(2000)],
      numberOfPages: data?.numberOfPages,
      language: [data?.language?.trim(), Validators.maxLength(10)],
      categoryList: [
        data?.categoryList.map((category) => category.name.trim()).join(','),
        Validators.maxLength(1000),
      ],
      tagList: [
        data?.tagList.map((tag) => tag.name.trim()).join(','),
        Validators.maxLength(1000),
      ],
      averageRating: [data?.averageRating],
      ratingsCount: [data?.ratingsCount],
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
    private fileMetaInfoService: BookInfoService,
    private snackBarService: SnackBarService
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

  submitForm(): void {
    this.update();
  }

  private loadBookInfo(fileSystemItemId: string) {
    this.bookInfoService.retrieveByFileSystemId(+fileSystemItemId).subscribe({
      next: (data) => {
        this.bookInfo = data;
        this.editForm = this.generateForm(data);
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

  update() {
    if (this.editForm?.valid) {
      const fileMetaInfoBook: FileMetaInfoBook = {
        id: this.bookInfo?.id,
        title: !!!this.editForm.value.title ? null : this.editForm.value.title,
        publisher: !!!this.editForm.value.publisher
          ? null
          : this.editForm.value.publisher,
        authors: !!!this.editForm.value.authors
          ? null
          : this.editForm.value.authors,
        description: !!!this.editForm.value.description
          ? null
          : this.editForm.value.description,
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
      };
      this.fileMetaInfoService
        .update(this.bookInfo!.id!, fileMetaInfoBook)
        .subscribe(() => {
          this.router.navigate([`/file-info/${this.fileSystemItem!.id}`]);
        });
    } else {
    }
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

      this.fileMetaInfoService
        .uploadBookCover(this.bookInfo!.id!, formData)
        .subscribe({
          next: (response) => {
            this.snackBarService.showInfoWithMessage(
              response.status ? 'Image uploaded successfully' : 'Server error'
            );
            this.loadBookInfoImageUrl(this.fileSystemItem!.id!);
          },
          error: () => {
            this.snackBarService.showErrorWithMessage(
              'failed to upload the book cover'
            );
          },
        });
    }
  }

  loadBookInfoImageUrl(fileSystemItemId: number) {
    this.bookInfoService.retrieveByFileSystemId(fileSystemItemId).subscribe({
      next: (data) => {
        this.bookInfo!.imageUrl = data.imageUrl;
      },
      error: () => {
        this.router.navigate(['/page-not-found']);
      },
    });
  }
}

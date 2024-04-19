import { Component, OnInit } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import { ActivatedRoute, Router } from '@angular/router';
import BookInfoService from '../../service/BookInfoService';
import FileMetaInfoBook from '../../model/FileMetaInfoBook';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { SearchService } from '../../service/SearchService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-file-info-editor',
  templateUrl: './file-info-editor.component.html',
  styleUrl: './file-info-editor.component.css',
})
export class FileInfoEditorComponent implements OnInit {
  bookInfo?: FileMetaInfoBook;
  fileSystemItem?: FileSystemItem;
  editForm: FormGroup<any> = this.generateForm(undefined);
  goToExplorer(fileSystemItem: FileSystemItem) {
    this.router.navigate([`/explorer/${fileSystemItem.id}`]);
  }
  generateForm(data: FileMetaInfoBook | undefined) {
    return this.formBuilder.group({
      title: [data?.title, Validators.maxLength(512)],
      publisher: [data?.publisher, [Validators.maxLength(100)]],
      author: [data?.authors, Validators.maxLength(100)],
      description: [data?.description, [Validators.maxLength(4000)]],
      publishedDate: [data?.publishedDate, [Validators.maxLength(50)]],
      isbn10: [
        data?.isbn10,
        [Validators.maxLength(10), Validators.minLength(10)],
      ],
      isbn13: [
        data?.isbn13,
        [Validators.maxLength(13), Validators.minLength(13)],
      ],
      // imageUrl: [data?.imageUrl, Validators.maxLength(500)],
      authors: [data?.authors, Validators.maxLength(500)],
      note: [data?.note, Validators.maxLength(2000)],
      numberOfPages: data?.numberOfPages,
      language: [data?.language, Validators.maxLength(10)],
      categoryList: [
        data?.categoryList.map((cat) => cat.name).join(','),
        Validators.maxLength(1000),
      ],
      tagList: [
        data?.tagList.map((tag) => tag.name).join(','),
        Validators.maxLength(1000),
      ],
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
    private searchService: SearchService,
    private fileMetaInfoService: BookInfoService
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
        authors: !!!this.editForm.value.author
          ? null
          : this.editForm.value.author,
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
        imageUrl: '',
        language: !!!this.editForm.value.language
          ? null
          : this.editForm.value.language!,
        numberOfPages: this.bookInfo?.numberOfPages!,
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
      };
      console.info('calling api...');
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
}

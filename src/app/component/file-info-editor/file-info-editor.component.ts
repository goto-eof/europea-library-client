import { Component, OnInit } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
type FileMetaInfoBookForm = {
  title: string;
  publisher: string;
  author: string;
  description: string;
  year: string;
  isbn: string;
  imageUrl: string;
  authors: string;
  note: string;
  isbn10: string;
  isbn13: string;
  numberOfPages: number;
  language: string;
  publishedDate: string;
  categoryList: string;
  tagList: string;
};
@Component({
  selector: 'app-file-info-editor',
  templateUrl: './file-info-editor.component.html',
  styleUrl: './file-info-editor.component.css',
})
export class FileInfoEditorComponent implements OnInit {
  bookInfo?: FileMetaInfoBook;
  fileSystemItem?: FileSystemItem;
  editForm: FormGroup<any> = this.generateForm(undefined);

  generateForm(data: FileMetaInfoBook | undefined) {
    return this.formBuilder.group({
      title: [data?.title, Validators.maxLength(100)],
      publisher: [data?.publisher, [Validators.maxLength(100)]],
      author: [data?.authors, Validators.maxLength(100)],
      description: [data?.description, [Validators.maxLength(100)]],
      year: [
        data?.publishedDate,
        [Validators.maxLength(4), Validators.pattern('[0-9]{4}')],
      ],
      isbn10: [data?.isbn10, Validators.maxLength(100)],
      isbn13: [data?.isbn13, Validators.maxLength(100)],
      imageUrl: [data?.imageUrl, Validators.maxLength(100)],
      authors: [data?.authors, Validators.maxLength(100)],
      note: [data?.note, Validators.maxLength(100)],
      numberOfPages: data?.numberOfPages,
      language: [data?.language, Validators.maxLength(100)],
      publishedDate: [data?.publishedDate, Validators.maxLength(100)],
      categoryList: [
        data?.categoryList.map((cat) => cat.name).join(','),
        Validators.maxLength(100),
      ],
      tagList: [
        data?.tagList.map((tag) => tag.name).join(','),
        Validators.maxLength(100),
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
    private searchService: SearchService
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

  submitForm(): void {}

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
}

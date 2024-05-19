import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import FileSystemItem from '../../../model/FileSystemItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent implements OnInit {
  @Input()
  fileSystemItem!: FileSystemItem;

  @Output()
  navigate: EventEmitter<FileSystemItem> = new EventEmitter<FileSystemItem>();

  breadcrumb: Array<FileSystemItem> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initArray();
  }

  private initArray() {
    this.breadcrumb = [];
    let fsi = this.fileSystemItem;

    if (fsi) {
      this.breadcrumb.push(fsi);
      while (fsi.parent) {
        this.breadcrumb.unshift(fsi.parent);
        fsi = fsi?.parent;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initArray();
  }

  goToFileSystem(selectedFileSystemItem: FileSystemItem) {
    if (selectedFileSystemItem.id !== this.fileSystemItem.id) {
      this.navigate.emit(selectedFileSystemItem);
    }
  }
}

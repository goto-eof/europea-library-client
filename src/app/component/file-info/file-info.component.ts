import { Component, Input } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';

@Component({
  selector: 'app-file-info',
  templateUrl: './file-info.component.html',
  styleUrl: './file-info.component.css',
})
export class FileInfoComponent {
  @Input({ required: true })
  fileSystemItem!: FileSystemItem;
}

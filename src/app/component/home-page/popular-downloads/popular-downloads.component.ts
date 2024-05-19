import { Component, Input, OnInit } from '@angular/core';
import GenericCursoredResponse from '../../../model/GenericCursoredResponse';
import FileSystemItemHighlight from '../../../model/FileSystemItemHighlight';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-downloads',
  templateUrl: './popular-downloads.component.html',
  styleUrl: './popular-downloads.component.css',
})
export class PopularDownloadsComponent implements OnInit {
  @Input()
  extension?: string;

  genericCursoredResponse?: GenericCursoredResponse<
    string,
    FileSystemItemHighlight
  >;

  constructor(
    private cursoredFileSystemService: CursoredFileSystemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoredFileSystemService
      .retrieveCursoredByDownloadCounHighlighted({
        limit: 4,
        parent: 'featured',
        nextCursor: null,
        fileType: this.extension!,
      })
      .subscribe({
        next: (data) => {
          data.childrenList.map((item) => {
            item.description = item.description
              ? item.description.length > 150
                ? item.description.substring(0, 150) + '...'
                : item.description
              : '';

            item.title = item.title
              ? item.title.length > 50
                ? item.title.substring(0, 50) + '...'
                : item.title
              : '';

            return item;
          });
          this.genericCursoredResponse = data;
        },
        error: () => {
          // this.snackBarService.showErrorWithMessage(
          //   'Unable to load featured books'
          // );
        },
      });
  }

  calculateCoverUrl(item: FileSystemItemHighlight) {
    if (item?.imageUrl) {
      return item.imageUrl;
    }
    return '/assets/images/no-cover.jpg';
  }

  goToItem(id: number) {
    this.router.navigate([`/file-info/${id}`]);
  }
}

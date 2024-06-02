import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { environment } from '../../../../environments/environment';
import FileSystemItem from '../../../model/FileSystemItem';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import PaginatedService from '../../../service/PaginatedService';
import Pair from '../../../model/Pair';
import CommonGenericCursoredResponse from '../../../model/CommonGenericCursoredResponse';
import CommonGenericCursoredRequest from '../../../model/CommonGenericCursoredRequest';

@Component({
  selector: 'app-paginated-pair-explorer',
  templateUrl: './paginated-pair-explorer.component.html',
  styleUrl: './paginated-pair-explorer.component.css',
})
export class PaginatedPairExplorerComponent implements OnInit {
  cursoredItem?: CommonGenericCursoredResponse<Pair<FileSystemItem, number>>;
  @Input() title!: string;
  @Input() service!: PaginatedService<Pair<FileSystemItem, number>>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.service
      .retrieve({
        limit: environment.LIMIT_EXPLORER_BY_DOWNLOAD_COUNT,
        nextCursor: null,
      })
      .subscribe({
        next: (cursoredItem) => {
          this.cursoredItem = cursoredItem;
        },
        error: (e) => {
          ErrorHandlerUtil.handleError(e, this.router);
        },
      });
  }

  loadMore() {
    const cursoredRequest: CommonGenericCursoredRequest = {
      limit: environment.LIMIT_EXPLORER_BY_DOWNLOAD_COUNT,
      nextCursor: this.cursoredItem?.nextCursor!,
    };
    this.service.retrieve(cursoredRequest).subscribe({
      next: (cursoredItem) => {
        this.cursoredItem!.childrenList = [
          ...this.cursoredItem!.childrenList,
          ...cursoredItem.childrenList,
        ];
        this.cursoredItem!.nextCursor = cursoredItem.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  goToFile(file: FileSystemItem) {
    const extras: NavigationExtras = {
      state: {
        fileSystemItem: file,
      },
    };
    this.router.navigate([`/file-info/${file.id}`], extras);
  }
}

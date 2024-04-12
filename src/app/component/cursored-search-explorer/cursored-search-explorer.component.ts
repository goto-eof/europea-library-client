import { Component } from '@angular/core';
import FileSystemItem from '../../model/FileSystemItem';
import SearchFileSystemItemRequest from '../../model/SearchFileSystemItemRequest';
import SearchResult from '../../model/SearchResult';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { NavigationExtras, Router } from '@angular/router';
import { SearchService } from '../../service/SearchService';

@Component({
  selector: 'app-cursored-search-explorer',
  templateUrl: './cursored-search-explorer.component.html',
  styleUrl: './cursored-search-explorer.component.css',
})
export class CursoredSearchExplorerComponent {
  searchResult: SearchResult<SearchFileSystemItemRequest, FileSystemItem> = {
    childrenList: [],
    nextCursor: null,
    query: {},
  };

  constructor(
    private cursoredFileSystemService: CursoredFileSystemService,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService
      .getSearchFileSystemItemRequest()
      .subscribe((searchRequest) => {
        if (searchRequest) {
          this.loadSearchFileSystemItemRequest(searchRequest);
        }
      });
  }

  private loadSearchFileSystemItemRequest(
    searchFileSystemItemRequest: SearchFileSystemItemRequest
  ) {
    this.searchResult.query = searchFileSystemItemRequest;
    this.cursoredFileSystemService
      .search(this.searchResult.query)
      .subscribe((data) => {
        this.searchResult = data;
        this.searchResult.query.nextCursor = data.nextCursor;
      });
  }

  loadMore() {
    if (!this.searchResult.query.nextCursor) {
      return;
    }
    this.cursoredFileSystemService
      .search(this.searchResult.query)
      .subscribe(
        (data: SearchResult<SearchFileSystemItemRequest, FileSystemItem>) => {
          this.searchResult.childrenList = [
            ...this.searchResult.childrenList,
            ...data.childrenList,
          ];
          this.searchResult.query.nextCursor = data.nextCursor;
        }
      );
  }

  goToChildren(fileSystemItem: FileSystemItem) {
    if (fileSystemItem.isDirectory) {
      this.router.navigate([`/explorer/${fileSystemItem.id}`]);
      return;
    }
    const extras: NavigationExtras = {
      state: {
        fileSystemItem,
      },
    };
    this.router.navigate([`/file-info/${fileSystemItem.id}`], extras);
  }
}

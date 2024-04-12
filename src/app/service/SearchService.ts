import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import SearchFileSystemItemRequest from '../model/SearchFileSystemItemRequest';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchFileSystemItemRequestSource = new BehaviorSubject<
    SearchFileSystemItemRequest | undefined
  >(undefined);

  public setSearchFileSystemItemRequest(
    searchFileSystemItemRequest: SearchFileSystemItemRequest
  ) {
    this.searchFileSystemItemRequestSource.next(searchFileSystemItemRequest);
  }

  public getSearchFileSystemItemRequest() {
    return this.searchFileSystemItemRequestSource.asObservable();
  }
}

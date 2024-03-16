import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileMetaInfoBook from '../model/FileMetaInfoBook';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8081/api/v1/bookInfo';
@Injectable()
export default class BookInfoService {
  constructor(private httpClient: HttpClient) {}

  retrieveByFileSystemId(
    fileSystemItemId: number
  ): Observable<FileMetaInfoBook> {
    return this.httpClient.get<FileMetaInfoBook>(
      `${baseUrl}/fileSystemItemId/${fileSystemItemId}`
    );
  }
}

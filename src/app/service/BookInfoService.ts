import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileMetaInfoBook from '../model/FileMetaInfoBook';
import { Observable } from 'rxjs';
import ApplicationConst from '../constants/ApplicationConst';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/bookInfo';
@Injectable()
export default class BookInfoService {
  constructor(private httpClient: HttpClient) {}

  lock(fileMetaInfoId: number) {
    return this.httpClient.put(`${baseUrl}/lock/${fileMetaInfoId}`, {});
  }

  unlock(fileMetaInfoId: number) {
    return this.httpClient.put(`${baseUrl}/unlock/${fileMetaInfoId}`, {});
  }

  retrieveByFileSystemId(
    fileSystemItemId: number
  ): Observable<FileMetaInfoBook> {
    return this.httpClient.get<FileMetaInfoBook>(
      `${baseUrl}/fileSystemItemId/${fileSystemItemId}`
    );
  }

  update(fileSystemItemId: number, bookInfo: FileMetaInfoBook) {
    return this.httpClient.put(`${baseUrl}/id/${fileSystemItemId}`, bookInfo);
  }
}

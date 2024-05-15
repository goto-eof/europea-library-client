import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileSystemItem from '../model/FileSystemItem';
import { Observable } from 'rxjs';
import ApplicationConst from '../constants/ApplicationConst';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/file';

@Injectable()
export default class FileSystemService {
  constructor(private httpClient: HttpClient) {}

  list(id?: number): Observable<FileSystemItem> {
    if (!id) {
      return this.httpClient.get<FileSystemItem>(`${baseUrl}`);
    }
    return this.httpClient.get<FileSystemItem>(`${baseUrl}/parentId/${id}`);
  }
}

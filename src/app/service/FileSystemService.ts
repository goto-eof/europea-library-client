import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileSystemItem from '../model/FileSystemItem';
import { Observable } from 'rxjs';
import ApplicationConst from '../constants/ApplicationConst';
import CursoredRequest from '../model/CursoredRequest';
import CursoredCategory from '../model/CursoredCategory';
import CursoredTag from '../model/CursoredTag';
import FileExtension from '../model/FileExtension';
import CursoredFileSystemItem from '../model/CursoredFileSystemItem';
import CursoredFileSystemItemByExtension from '../model/CursoredFileExtensionRequest';

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

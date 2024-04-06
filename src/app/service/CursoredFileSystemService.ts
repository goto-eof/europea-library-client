import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CursoredRequest from '../model/CursoredRequest';
import CursoredFileSystemItem from '../model/CursoredFileSystemItem';
import ApplicationConst from '../constants/ApplicationConst';
import CursoredFileSystemItemByExtension from '../model/CursoredFileExtensionRequest';
import FileExtension from '../model/FileExtension';
import CursoredExtension from '../model/CursoredExtension';
import CursoredCategory from '../model/CursoredCategory';
import CursoredTag from '../model/CursoredTag';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v2/file';

@Injectable()
export default class CursoredFileSystemService {
  get(fileSystemItemId: number) {
    return this.httpClient.get<CursoredFileSystemItem>(
      `${baseUrl}/${fileSystemItemId}`
    );
  }
  constructor(private httpClient: HttpClient) {}

  listCursored(
    cursoredRequest?: CursoredRequest
  ): Observable<CursoredFileSystemItem> {
    if (!cursoredRequest) {
      return this.httpClient.get<CursoredFileSystemItem>(`${baseUrl}/cursored`);
    }
    return this.httpClient.post<CursoredFileSystemItem>(
      `${baseUrl}/cursored`,
      cursoredRequest
    );
  }

  download(fileSystemItemId: number): Observable<any> {
    const header = { Accept: 'application/octet-stream' };
    return this.httpClient.get(`${baseUrl}/download/${fileSystemItemId}`, {
      responseType: 'arraybuffer',
      headers: header,
    });
  }
  getExtensions() {
    return this.httpClient.get<Array<FileExtension>>(`${baseUrl}/extension`);
  }

  getCursoredFileSystemItemByExtension(
    payload: CursoredFileSystemItemByExtension
  ): Observable<CursoredExtension> {
    return this.httpClient.post<CursoredExtension>(
      `${baseUrl}/cursored/extension`,
      payload
    );
  }

  listByCategory(cursorRequest: CursoredRequest): Observable<CursoredCategory> {
    return this.httpClient.post<CursoredCategory>(
      `${baseUrl}/cursored/category`,
      cursorRequest
    );
  }

  listByTag(cursorRequest?: CursoredRequest): Observable<CursoredTag> {
    return this.httpClient.post<CursoredTag>(
      `${baseUrl}/cursored/tag`,
      cursorRequest
    );
  }
}

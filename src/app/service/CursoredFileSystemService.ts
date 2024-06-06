import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import CursoredRequest from '../model/CursoredRequest';
import CursoredFileSystemItem from '../model/CursoredFileSystemItem';
import CursoredFileSystemItemByExtension from '../model/CursoredFileExtensionRequest';
import FileExtension from '../model/FileExtension';
import CursoredExtension from '../model/CursoredExtension';
import CursoredCategory from '../model/CursoredCategory';
import CursoredTag from '../model/CursoredTag';
import SearchFileSystemItemRequest from '../model/SearchFileSystemItemRequest';
import SearchResult from '../model/SearchResult';
import FileSystemItem from '../model/FileSystemItem';
import GenericCursoredRequest from '../model/GenericCursoredRequest';
import GenericCursoredResponse from '../model/GenericCursoredResponse';
import FileSystemItemHighlight from '../model/FileSystemItemHighlight';
import GenericCursoredRequestByFileType from '../model/GenericCursoredRequestByFileType';
import LinkInfo from "../model/LinkInfo";

const baseUrl = '/api/v2/file';

@Injectable()
export default class CursoredFileSystemService {
  retrieveCursoredByDownloadCount(
    cursorRequest: GenericCursoredRequestByFileType<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/downloadCount`, cursorRequest);
  }

  retrieveCursoredByDownloadCounHighlighted(
    cursorRequest: GenericCursoredRequestByFileType<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItemHighlight>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItemHighlight>
    >(`${baseUrl}/cursored/downloadCount/highlight`, cursorRequest);
  }

  get(fileSystemItemId: number) {
    return this.httpClient.get<CursoredFileSystemItem>(
      `${baseUrl}/${fileSystemItemId}`
    );
  }

  getByFileMetaInfoId(fileMetaInfoId: number) {
    return this.httpClient.get<CursoredFileSystemItem>(
      `${baseUrl}/fileMetaInfoId/${fileMetaInfoId}`
    );
  }

  constructor(private httpClient: HttpClient) {
  }

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


  getDownloadLink(fileSystemItemId: number): Observable<LinkInfo> {
    return this.httpClient.get<LinkInfo>(`${baseUrl}/download/getLink/fileSystemItemId/${fileSystemItemId}`);
  }


  download(downloadLink: string): Observable<any> {
    const header = {Accept: 'application/octet-stream'};
    return this.httpClient.get(`${downloadLink}`, {
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

  search(
    cursorRequest?: SearchFileSystemItemRequest
  ): Observable<SearchResult<SearchFileSystemItemRequest, FileSystemItem>> {
    return this.httpClient.post<
      SearchResult<SearchFileSystemItemRequest, FileSystemItem>
    >(`${baseUrl}/cursored/search`, cursorRequest);
  }

  listByLanguage(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/language`, cursorRequest);
  }

  listByPublishedDate(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/publishedDate`, cursorRequest);
  }

  listByPublisher(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/publisher`, cursorRequest);
  }

  listByRating(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/rating`, cursorRequest);
  }

  retrieveNewCursored(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored/new`, cursorRequest);
  }

  retrieveNewCursoredHighlight(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItemHighlight>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItemHighlight>
    >(`${baseUrl}/cursored/new/highlight`, cursorRequest);
  }
}

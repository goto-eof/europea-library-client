import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import OperationStatus from '../model/OperationStatus';
import GenericCursoredRequest from '../model/GenericCursoredRequest';
import GenericCursoredResponse from '../model/GenericCursoredResponse';
import FileSystemItemHighlight from '../model/FileSystemItemHighlight';
import FileSystemItem from '../model/FileSystemItem';

const baseUrl = '/api/v1/featured';

@Injectable()
export default class FeaturedService {
  constructor(private httpClient: HttpClient) {}

  retrieveCursoredHighlight(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItemHighlight>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItemHighlight>
    >(`${baseUrl}/cursored/highlight`, cursorRequest);
  }

  isFeatured(fileSystemItemId: number) {
    return this.httpClient.get<OperationStatus>(
      `${baseUrl}/isFeatured/${fileSystemItemId}`
    );
  }

  add(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(
      `${baseUrl}/add/${fileSystemItemId}`,
      {}
    );
  }

  remove(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.post<OperationStatus>(
      `${baseUrl}/remove/${fileSystemItemId}`,
      {}
    );
  }

  retrieveCursored(
    cursorRequest: GenericCursoredRequest<string>
  ): Observable<GenericCursoredResponse<string, FileSystemItem>> {
    return this.httpClient.post<
      GenericCursoredResponse<string, FileSystemItem>
    >(`${baseUrl}/cursored`, cursorRequest);
  }

  retrieveHighlight(): Observable<FileSystemItemHighlight> {
    return this.httpClient.get<FileSystemItemHighlight>(`${baseUrl}/highlight`);
  }

  isHighlight(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.get<OperationStatus>(
      `${baseUrl}/isHighlight/${fileSystemItemId}`
    );
  }

  setHighlight(fileSystemItemId: number): Observable<OperationStatus> {
    return this.httpClient.put<OperationStatus>(
      `${baseUrl}/highlight/${fileSystemItemId}`,
      {}
    );
  }
}

import { Observable } from 'rxjs';
import CommonGenericCursoredRequest from '../model/CommonGenericCursoredRequest';
import CommonGenericCursoredResponse from '../model/CommonGenericCursoredResponse';
import FileSystemItem from '../model/FileSystemItem';
import Pair from '../model/Pair';
import PaginatedService from './PaginatedService';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = '/api/v1/sales';
@Injectable()
export default class TopSoldService
  implements PaginatedService<Pair<FileSystemItem, number>>
{
  constructor(private httpClient: HttpClient) {}

  retrieve(
    cursorRequest: CommonGenericCursoredRequest
  ): Observable<CommonGenericCursoredResponse<Pair<FileSystemItem, number>>> {
    return this.httpClient.post<
      CommonGenericCursoredResponse<Pair<FileSystemItem, number>>
    >(`${baseUrl}/cursored/topSold`, cursorRequest);
  }
}

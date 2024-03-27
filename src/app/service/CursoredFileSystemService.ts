import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CursoredRequest from '../model/CursoredRequest';
import CursoredFileSystemItem from '../model/CursoredFileSystemItem';
import ApplicationConst from '../constants/ApplicationConst';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/file/cursored';

@Injectable()
export default class CursoredFileSystemService {
  constructor(private httpClient: HttpClient) {}

  list(cursoredRequest?: CursoredRequest): Observable<CursoredFileSystemItem> {
    if (!cursoredRequest) {
      return this.httpClient.get<CursoredFileSystemItem>(`${baseUrl}`);
    }
    return this.httpClient.post<CursoredFileSystemItem>(
      `${baseUrl}`,
      cursoredRequest
    );
  }
}

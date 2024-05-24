import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CommonCursoredRequest from '../model/CommonCursoredRequest';
import Cursor from '../model/Cursor';
import Tag from '../model/Tag';
import { environment } from '../../environments/environment';
import OperationStatus from '../model/OperationStatus';
import Rename from '../model/Rename';

const baseUrl = '/api/v1/tag';

@Injectable()
export default class CursoredTagService {
  constructor(private httpClient: HttpClient) {}

  list(cursoredRequest?: CommonCursoredRequest): Observable<Cursor<Tag>> {
    if (!cursoredRequest) {
      cursoredRequest = {
        limit: environment.tagsPerRequest,
        nextCursor: null,
      };
    }
    return this.httpClient.post<Cursor<Tag>>(`${baseUrl}`, cursoredRequest);
  }

  rename(oldName: string, newName: string): Observable<OperationStatus> {
    const payload: Rename = {
      oldName,
      newName,
    };
    return this.httpClient.post<OperationStatus>(`${baseUrl}/rename`, payload);
  }
}

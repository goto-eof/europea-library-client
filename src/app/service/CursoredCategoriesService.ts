import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import CommonCursoredRequest from '../model/CommonCursoredRequest';
import Cursor from '../model/Cursor';
import Category from '../model/Category';
import { environment } from '../../environments/environment';
import OperationStatus from '../model/OperationStatus';
import Rename from '../model/Rename';

const baseUrl = '/api/v1/category';

@Injectable()
export default class CursoredCategoriesService {
  constructor(private httpClient: HttpClient) {}

  list(cursoredRequest?: CommonCursoredRequest): Observable<Cursor<Category>> {
    if (!cursoredRequest) {
      cursoredRequest = {
        limit: environment.categoriesPerRequest,
        nextCursor: null,
      };
    }
    return this.httpClient.post<Cursor<Category>>(
      `${baseUrl}`,
      cursoredRequest
    );
  }

  rename(oldName: string, newName: string): Observable<OperationStatus> {
    const payload: Rename = {
      oldName,
      newName,
    };
    return this.httpClient.post<OperationStatus>(`${baseUrl}/rename`, payload);
  }
}

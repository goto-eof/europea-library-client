import { Observable } from 'rxjs';
import CommonGenericCursoredRequest from '../model/CommonGenericCursoredRequest';
import CommonGenericCursoredResponse from '../model/CommonGenericCursoredResponse';

export default interface PaginatedService<T> {
  retrieve(
    cursorRequest: CommonGenericCursoredRequest
  ): Observable<CommonGenericCursoredResponse<T>>;
}

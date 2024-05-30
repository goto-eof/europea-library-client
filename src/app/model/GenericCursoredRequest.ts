import CommonGenericCursoredRequest from './CommonGenericCursoredRequest';

export default interface GenericCursoredRequest<T>
  extends CommonGenericCursoredRequest {
  parent: T;
}

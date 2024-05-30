import CommonGenericCursoredResponse from './CommonGenericCursoredResponse';

export default interface GenericCursoredResponse<T, U>
  extends CommonGenericCursoredResponse<U> {
  parent: T;
}

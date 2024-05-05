export default interface GenericCursoredResponse<T, U> {
  parent: T;
  childrenList: Array<U>;
  nextCursor: number;
}

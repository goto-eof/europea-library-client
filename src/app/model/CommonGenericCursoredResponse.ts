export default interface CommonGenericCursoredResponse<U> {
  childrenList: Array<U>;
  nextCursor: number;
}

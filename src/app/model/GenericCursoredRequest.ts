export default interface GenericCursoredRequest<T> {
  parent: T;
  nextCursor: number | null;
  limit: number;
}

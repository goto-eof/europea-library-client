export default interface CursoredRequest {
  parentId: number;
  nextCursor: number | null;
  limit: number;
}

export default interface SearchResult<Q, C> {
  query: Q;
  childrenList: Array<C>;
  nextCursor?: number | null;
}

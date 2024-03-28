export default interface Cursor<T> {
  items: Array<T>;
  nextCursor: number | null;
}

import FileSystemItem from './FileSystemItem';

export default interface GenericCursoredResponse<T> {
  parent: T;
  childrenList: Array<FileSystemItem>;
  nextCursor: number;
}

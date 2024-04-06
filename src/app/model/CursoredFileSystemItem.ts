import FileSystemItem from './FileSystemItem';

export default interface CursoredFileSystemItem extends FileSystemItem {
  nextCursor: number | null;
}

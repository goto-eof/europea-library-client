import FileSystemItem from './FileSystemItem';
import ModelCommon from './ModelCommon';

export default interface CursoredFileSystemItem extends FileSystemItem {
  nextCursor: number | null;
}

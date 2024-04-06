import FileSystemItem from './FileSystemItem';
import Tag from './Tag';

export default interface CursoredExtension {
  extension: string;
  childrenList: Array<FileSystemItem>;
  nextCursor: number;
}

import FileSystemItem from './FileSystemItem';
import Tag from './Tag';

export default interface CursoredTag {
  tag: Tag;
  childrenList: Array<FileSystemItem>;
  nextCursor: number;
}

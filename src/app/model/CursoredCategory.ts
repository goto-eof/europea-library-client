import Category from './Category';
import FileSystemItem from './FileSystemItem';

export default interface CursoredCategory {
  category: Category;
  childrenList: Array<FileSystemItem>;
  nextCursor: number;
}

import Category from './Category';
import FileMetaInfo from './FileMetaInfo';
import Tag from './Tag';

export default interface FileMetaInfoBook extends FileMetaInfo {
  imageUrl: string;
  authors: string;
  note: string;
  isbn10: string;
  isbn13: string;
  numberOfPages: number;
  language: string;
  publisher: string;
  publishedDate: string;
  fileExtractionStatus: number;
  webRetrievementStatus: number;
  fileSystemItemIdList: Array<number>;
  categoryList: Array<Category>;
  tagList: Array<Tag>;
  averageRating: number;
  ratingsCount: number;
}

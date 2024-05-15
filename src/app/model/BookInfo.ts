import Category from './Category';
import ModelCommon from './ModelCommon';
import Tag from './Tag';

export default interface BookInfo extends ModelCommon {
  imageUrl?: string;
  authors: string;
  note: string;
  isbn10: string;
  isbn13: string;
  numberOfPages?: number;
  language?: string;
  publisher: string;
  publishedDate: string;
  fileExtractionStatus?: number;
  webRetrievementStatus?: number;
  fileSystemItemIdList?: Array<number>;
  categoryList: Array<Category>;
  averageRating?: number;
  ratingsCount?: number;
  manualLock?: number;
}

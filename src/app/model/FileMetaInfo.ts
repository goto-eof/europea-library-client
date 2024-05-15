import BookInfo from './BookInfo';
import ModelCommon from './ModelCommon';
import StripePrice from './StripePrice';
import Tag from './Tag';

export default interface FileMetaInfo extends ModelCommon {
  title: string;
  description: string;
  tagList: Array<Tag>;
  onSale: boolean;
  price?: number;
  hidden: boolean;
  bookInfo?: BookInfo;
  stripePrice?: StripePrice;
}

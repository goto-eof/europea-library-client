import ModelCommon from './ModelCommon';
import Tag from './Tag';

export default interface FileMetaInfo extends ModelCommon {
  title: string;
  description: string;
  tagList: Array<Tag>;
  onSale: boolean;
  price?: number;
  hidden: boolean;
}

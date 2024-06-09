import FileMetaInfo from './FileMetaInfo';
import ModelCommon from './ModelCommon';

export default interface FileSystemItem extends ModelCommon {
  name?: string;
  size?: number;
  basePath: string;
  extension?: string;
  fileCreationDate?: Date;
  fileUpdateDate?: Date;
  isDirectory: boolean;
  parent?: FileSystemItem;
  childrenList?: Array<FileSystemItem>;
  downloadCount: number;
  createdDate?: Date;
  fileMetaInfo?: FileMetaInfo;
  averageRating?: number;
  ratingsCount?: number;
}

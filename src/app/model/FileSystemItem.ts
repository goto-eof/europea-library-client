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
}

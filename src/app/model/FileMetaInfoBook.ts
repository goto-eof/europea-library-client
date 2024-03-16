import FileMetaInfo from './FileMetaInfo';

export default interface FileMetaInfoBook extends FileMetaInfo {
  imageUrl: string;
  authors: string;
  note: string;
  sbn: string;
  isbn: string;
  year: number;
  fileSystemItemIdList: Array<number>;
}

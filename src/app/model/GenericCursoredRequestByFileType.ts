import GenericCursoredRequest from './GenericCursoredRequest';

export default interface GenericCursoredRequestByFileType<T>
  extends GenericCursoredRequest<T> {
  fileType?: string;
}

export default interface CursoredFileSystemItemByExtension {
  extension: string;
  nextCursor: number | null;
  limit: number;
}

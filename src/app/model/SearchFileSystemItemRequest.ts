export default interface SearchFileSystemItemRequest {
  title?: string;
  publisher?: string;
  author?: string | null;
  description?: string;
  year?: number;
  isbn?: string;
  nextCursor?: number | null;
  limit?: number;
}

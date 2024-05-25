import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileMetaInfo from '../model/FileMetaInfo';

const baseUrl = '/api/v1/bookInfo';
@Injectable()
export default class FileMetaInfoService {
  constructor(private httpClient: HttpClient) {}

  update(fileMetaInfoId: number, fileMetaInfo: FileMetaInfo) {
    return this.httpClient.put(
      `${baseUrl}/fileMetaInfoId/${fileMetaInfoId}`,
      fileMetaInfo
    );
  }
}

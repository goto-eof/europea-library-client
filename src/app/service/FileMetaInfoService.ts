import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import FileMetaInfo from '../model/FileMetaInfo';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/bookInfo';
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

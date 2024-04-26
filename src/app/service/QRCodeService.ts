import { Injectable } from '@angular/core';
import ApplicationConst from '../constants/ApplicationConst';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = ApplicationConst.API_ENDPOINT + '/api/v1/qrcode';

@Injectable({ providedIn: 'root' })
export default class QRCodeService {
  constructor(private httpClient: HttpClient) {}

  retrieveDownloadLink(fileSystemItemId: number): Observable<any> {
    const headers = { Accept: 'application/octet-stream' };
    return this.httpClient.get(`${baseUrl}/get/${fileSystemItemId}`, {
      responseType: 'arraybuffer',
      headers,
    });
  }
 
}

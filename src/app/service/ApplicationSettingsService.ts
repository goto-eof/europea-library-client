import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ApplicationSettings from '../model/ApplicationSettings';

const baseUrl = '/api/v1/settings';

@Injectable()
export default class ApplicationSettingsService {
  constructor(private httpClient: HttpClient) {}

  get(): Observable<ApplicationSettings> {
    return this.httpClient.get<ApplicationSettings>(`${baseUrl}`);
  }

  update(
    applicationSettings: ApplicationSettings
  ): Observable<ApplicationSettings> {
    return this.httpClient.patch<ApplicationSettings>(
      `${baseUrl}`,
      applicationSettings
    );
  }
}

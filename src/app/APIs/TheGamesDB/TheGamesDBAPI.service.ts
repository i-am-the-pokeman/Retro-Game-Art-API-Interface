import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GETPlatformsRequest, TheGamesDBBaseUrl } from './TheGamesDBAPIEntities';

@Injectable()
export class TheGamesDBAPIService {

  constructor(private http: HttpClient) { }

  getAllPlatforms(request: GETPlatformsRequest) {
    // TODO: create a reusable way to generate GET requests with query params
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);

    return this.http.get(TheGamesDBBaseUrl + 'v1/Platforms', { params: params });
  }
}

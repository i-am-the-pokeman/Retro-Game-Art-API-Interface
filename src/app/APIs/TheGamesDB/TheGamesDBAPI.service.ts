import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GETPlatformsRequest, TheGamesDBBaseUrl } from './TheGamesDBAPIEntities';

@Injectable()
export class TheGamesDBAPIService {

  constructor(private http: HttpClient) { }

  getAllPlatforms(request: GETPlatformsRequest) {
    // TODO: create a reusable way to generate GET requests with query params
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);

    // TODO: append fields separately if provided
    // if (request.fields?.length) {
    //   params = params.append('fields')
    // }
    return this.http.get(TheGamesDBBaseUrl + 'v1/Platforms', { params: params })
  }
}

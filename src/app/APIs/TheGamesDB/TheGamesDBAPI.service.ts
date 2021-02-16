import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GETPlatformsRequest, TheGamesDBBaseUrl } from './TheGamesDBAPIEntities';
import { tap } from 'rxjs/operators';
import { APIUtils } from '../API-utils';
import { of } from 'rxjs';
const Store = window.require('electron-store');
const electronStore = new Store({accessPropertiesByDotNotation: false});

@Injectable()
export class TheGamesDBAPIService {

  constructor(private http: HttpClient) { }

  getAllPlatforms(request: GETPlatformsRequest) {
    // TODO: create a reusable way to generate GET requests with query params
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);
  
    let url = APIUtils.buildUrlWithQueryParams(TheGamesDBBaseUrl + 'v1/Platforms', params);

    if (electronStore.has(url)) {
      return of(electronStore.get(url));
    } else {
      return this.http.get(url)
              .pipe(
                tap((response) => {
                  electronStore.set(`${url}`, response);
                })
              );
    }
  }
}

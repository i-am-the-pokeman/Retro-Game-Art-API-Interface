import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GETGameImagesByGameIdRequest, GETGameImagesByGameIdResponse, GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse, TheGamesDBBaseUrl } from './TheGamesDBAPIEntities';
import { tap } from 'rxjs/operators';
import { APIUtils } from '../API-utils';
import { Observable, of } from 'rxjs';
const Store = window.require('electron-store');
const electronStore = new Store({accessPropertiesByDotNotation: false});

@Injectable()
export class TheGamesDBAPIService {

  constructor(private http: HttpClient) { }

  getAllPlatforms(request: GETPlatformsRequest): Observable<GETPlatformsResponse> {
    // TODO: create a reusable way to generate GET requests with query params
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);
  
    let url = APIUtils.buildUrlWithQueryParams(TheGamesDBBaseUrl + 'v1/Platforms', params);

    if (electronStore.has(url)) {
      return of(electronStore.get(url));
    } else {
      return this.http.get<GETPlatformsResponse>(url)
              .pipe(
                tap((response) => {
                  electronStore.set(`${url}`, response);
                })
              );
    }
  }

  getGamesByPlatformId(request: GETGamesByPlatformIdRequest): Observable<GETGamesByPlatformIdResponse> {
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);
    params = params.append('id', request.id);
  
    let url = APIUtils.buildUrlWithQueryParams(TheGamesDBBaseUrl + 'v1/Games/ByPlatformID', params);

    if (electronStore.has(url)) {
      return of(electronStore.get(url));
    } else {
      return this.http.get<GETGamesByPlatformIdResponse>(url)
              .pipe(
                tap((response) => {
                  electronStore.set(`${url}`, response);
                })
              );
    }
  }

  getGameImagesByGameIdRequest(request: GETGameImagesByGameIdRequest): Observable<GETGameImagesByGameIdResponse> {
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);
    params = params.append('games_id', request.games_id);

    let url = APIUtils.buildUrlWithQueryParams(TheGamesDBBaseUrl + 'v1/Games/Images', params);

    if (electronStore.has(url)) {
      return of(electronStore.get(url));
    } else {
      return this.http.get<GETGameImagesByGameIdResponse>(url)
              .pipe(
                tap((response) => {
                  electronStore.set(`${url}`, response);
                })
              );
    }
  }
}

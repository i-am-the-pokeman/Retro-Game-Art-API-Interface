import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Game,
  GETGameImagesByGameIdRequest,
  GETGameImagesByGameIdResponse,
  GETGamesByPlatformIdRequest,
  GETGamesByPlatformIdResponse,
  GETPlatformsRequest,
  GETPlatformsResponse,
  TheGamesDBBaseUrl
} from './TheGamesDBAPIEntities';
import { expand, map, reduce, tap } from 'rxjs/operators';
import { APIUtils } from '../API-utils';
import { EMPTY, Observable, of } from 'rxjs';
import { DictionaryUtils } from 'src/app/shared/utils/dictionary-utils';
const Store = window.require('electron-store');
const electronStore = new Store({accessPropertiesByDotNotation: false});

@Injectable()
export class TheGamesDBAPIService {

  constructor(private http: HttpClient) { }

  getAllPlatforms(request: GETPlatformsRequest): Observable<GETPlatformsResponse> {
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

  //#region Fetch Entire List of Games By Platform Id
  // TODO: Can common logic be pulled from this and turned into a generic util method?
  getAllGamesByPlatformId(request: GETGamesByPlatformIdRequest): Observable<Game[]> {
    let params = new HttpParams();
    params = params.append('apikey', request.apikey);
    params = params.append('id', request.id);

    let url = APIUtils.buildUrlWithQueryParams(TheGamesDBBaseUrl + 'v1/Games/ByPlatformID', params);

    if (electronStore.has(url)) {
      return of(electronStore.get(url));
    } else {
      return this.getGamesByPlatformIdPage(url)
        .pipe(
          expand((data) => {
            console.log(data.results)
            return (data.next) ?
              this.getGamesByPlatformIdPage(data.next) :
              EMPTY;
          }),
          reduce((acc, data) => {
            return acc.concat(data.results);
          }, []),
          tap((response) => {
            electronStore.set(`${url}`, response);
          })

        )
    }
  }
  // TODO: this can be turned into a generic util method for paging thru any paged TheGamesDB response
  getGamesByPlatformIdPage(url: string) {
    return this.http.get < GETGamesByPlatformIdResponse > (url)
      .pipe(
        map(response => {
          console.log(response);
          return {
            next: response.pages.next,
            results: DictionaryUtils.GetDictionaryValues(response.data.games)
          };
        })
      );
  }
  //#endregion

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

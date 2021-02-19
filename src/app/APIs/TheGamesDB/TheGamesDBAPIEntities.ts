export const TheGamesDBBaseUrl = 'https://api.thegamesdb.net/';

export interface BaseApiResponse {
  code: number;
  status: string;
  remaining_monthly_allowance: number;
  extra_allowance: number;
}

// DTOs
export interface GETPlatformsRequest {
  apikey: string;
  fields?: string;
}
export interface GETPlatformsResponse extends BaseApiResponse {
  data: GetPlatformsData;
}
export interface GetPlatformsData {
  count: number;
  platforms: PlatformsDictionary;
}
export interface PlatformsDictionary {
    [key: string]: Platform;
}

// ---

export interface GETGamesByPlatformIdRequest {
  apikey: string;
  id: string;
  fields?: string;
  include?: string;
  page?: number;
}
export interface GETGamesByPlatformIdResponse extends GETGamesByGameIdResponse {}

// --

export interface GETGamesByGameIdResponse extends BaseApiResponse {
    data: GetGamesData;
}
export interface GetGamesData {
    count: number;
    data: Game[];
}

// --

export interface GETGameImagesByGameIdRequest {
    apikey: string;
    games_id: string;   
}
export interface GETGameImagesByGameIdResponse extends BaseApiResponse {
    data: GetGameImagesData
}
export interface GetGameImagesData {
    count: number;
    base_url: ImageBaseUrlMeta;
    images: GameImage[];
}

// END DTOs

// Common Models
export interface Platform {
  id: number;
  name: string;
  alias: string;
  icon: string;
  console: string;
  controller: string;
  developer: string;
  overview: string;
}

export interface Game {
  id: number;
  game_title: string;
  release_date: string;
  platform: number;
  players: number;
  overview: string;
  last_updated: string;
  rating: string;
  coop: string;
  youtube: string;
  os: string;
  processor: string;
  ram: string;
  hdd: string;
  video: string;
  sound: string;
  developers: number[];
  genres: number[];
  publishers: number[];
  alternates: string[];
}

export interface ImageBaseUrlMeta {
    original: string;
    small: string;
    thumb: string;
    cropped_center_thumb: string;
    medium: string;
    large: string;
}

export interface GameImage {
    id: number;
    type: string;
    side: string;
    filename: string;
    resolution: string;
}
// END Common Models
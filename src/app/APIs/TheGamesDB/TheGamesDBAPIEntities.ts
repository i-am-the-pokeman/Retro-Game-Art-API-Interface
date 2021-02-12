export const TheGamesDBBaseUrl = 'api.thegamesdb.net/';

export interface GETPlatformsRequest {
    apikey: string;
    fields?: string;
}
export interface GETPlatformsRsponse {
    code: number;
    status: string;
    remaining_monthly_allowance: number;

    data: GetPlatformsData;
}
export interface GetPlatformsData {
    count: number;
    platforms: Platform[];
}

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
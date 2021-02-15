import { HttpParams } from "@angular/common/http";

export class APIUtils {
    // TODO: add tests
    public static buildUrlWithQueryParams(mainUrl: string = '', params: HttpParams): string {
        let stringifiedParams = '';
        if (params.keys().length) {
            stringifiedParams = '?'
            stringifiedParams += params.keys()
                                        .map((key) => key + '=' + params.get(key))
                                        .join('');
        }
        return mainUrl += stringifiedParams;
    }
}
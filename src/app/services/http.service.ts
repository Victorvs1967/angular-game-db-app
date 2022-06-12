import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse, Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = search ?
      new HttpParams().set('ordering', ordering).set('search', search) :
      new HttpParams().set('ordering', ordering);

    return this.http.get<APIResponse<Game>>(environment.baseUrl.concat('/games'), { params: params });
  }

  getGameDetails(id: number): Observable<Game> {
    const gameInfoRequest = this.http.get(environment.baseUrl.concat('/games/').concat(id.toString()));
    const gameScreenshotRequest = this.http.get(environment.baseUrl.concat('/games/').concat(id.toString()).concat('/screenshots'));
    const gameTrailersRequest = this.http.get(environment.baseUrl.concat('/games/').concat(id.toString()).concat('/movies'));
    
    return forkJoin({ gameInfoRequest, gameScreenshotRequest, gameTrailersRequest }).pipe(
      map((response: any) => {
        return {
          ...response['gameInfoRequest'],
          screenshots: response['gameScreenshotRequest'].results,
          trailers: response['gameTrailersRequest'].results,
        }
      })
    );
  }
}

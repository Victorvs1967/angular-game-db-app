import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
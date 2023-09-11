import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  private episodeApi: string = 'episode';
  constructor(
    private _httpService: HttpService,
  ) { }

  getAllEpisodes(page: number): Observable<any> {
    if (+page > 3) page = 3;
    let url: string = `${this.episodeApi}?page=${page}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getAllEpisodesWithFilterName(name: string): Observable<any> {
    let url: string = `${this.episodeApi}?name=${name}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getEpisodeById(id: number): Observable<any> {
    let url: string = `${this.episodeApi}/${id}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }
}

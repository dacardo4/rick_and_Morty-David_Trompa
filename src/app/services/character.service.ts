import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private characterApi: string = 'character';
  constructor(
    private _httpService: HttpService,
  ) { }

  getAllCharacters(page: number): Observable<any> {
    if (+page > 42) page = 42;
    let url: string = `${this.characterApi}?page=${page}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getAllCharactersWithFilterName(name: string): Observable<any> {
    let url: string = `${this.characterApi}?name=${name}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getCharacterById(id: number): Observable<any> {
    let url: string = `${this.characterApi}/${id}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }
}

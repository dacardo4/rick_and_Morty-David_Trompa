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

  getAllCharacters(page: string): Observable<any> {
    if (+page > 42) page = '42';
    let url: string = `${this.characterApi}?page=${page}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }
}

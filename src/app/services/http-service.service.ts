import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private urlApi = 'https://rickandmortyapi.com/api/';

  constructor(
    private _http: HttpClient
  ) { }

  httpGet(url: string): any {
    return this._http.get(`${this.urlApi}/${url}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private locationApi: string = 'location';
  constructor(
    private _httpService: HttpService,
  ) { }

  getAllLocations(page: number): Observable<any> {
    if (+page > 42) page = 42;
    let url: string = `${this.locationApi}?page=${page}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getAllLocationsWithFilterName(name: string): Observable<any> {
    let url: string = `${this.locationApi}?name=${name}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }

  getLocationById(id: number): Observable<any> {
    let url: string = `${this.locationApi}/${id}`;
    return this._httpService.httpGet(url).pipe(take(1));
  }
}

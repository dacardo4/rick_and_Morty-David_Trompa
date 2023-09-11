import { Component } from '@angular/core';
import { Location } from 'src/app/models/location';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {

  public page: number = 1;
  public pageMaxLimit: number = 0;
  public locationsList: Location[] = [];
  public navigatorOptions: number[] = [];
  public showLoader = false;
  public orderBy = 'Name Asc';
  public nameToFilter = '';

  constructor(
    private _locationService: LocationsService,
  ) {
    this.getLocationsData();
  }

  getLocationsData(): void {
    this.showLoader = true;
    this._locationService.getAllLocations(this.page).subscribe({
      next: response => {
        this.locationsList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        console.log('err getLocationsData', err);
      }
    });
  }

  calculateNavigator(page: number): void {
    if (page <= 3) this.navigatorOptions = [1,2,3,4,5];
    if (page >= (this.pageMaxLimit-2)) this.navigatorOptions = [this.pageMaxLimit-4, this.pageMaxLimit-3, this.pageMaxLimit-2, this.pageMaxLimit-1, this.pageMaxLimit];
    if (page > 3 && page < (this.pageMaxLimit-2)) this.navigatorOptions = [page-2, page-1, page, page+1, page+2];
    if (this.pageMaxLimit == 1 ) this.navigatorOptions = [1];
    if (this.pageMaxLimit == 2 ) this.navigatorOptions = [1,2];
    if (this.pageMaxLimit == 3 ) this.navigatorOptions = [1,2,3];
    if (this.pageMaxLimit == 4 ) this.navigatorOptions = [1,2,3,4];
    if (this.pageMaxLimit == 5 ) this.navigatorOptions = [1,2,3,4,5];
    this.showLoader = false;
  }

  updateIndexLocationTable(pageNumber: number): void {
    if (
      pageNumber == this.page ||
      pageNumber < 1 ||
      pageNumber > this.pageMaxLimit
    ) return;
    this.page = pageNumber;
    this.getLocationsData();
  }

  showLocationDetails(id: string): void {
    let url = `/locationDetails/${id}`;
    window.open(url, "_blank");
  }

  getDataFilteredByName(): void {
    this.showLoader = true;
    this._locationService.getAllLocationsWithFilterName(this.nameToFilter).subscribe({
      next: response => {
        this.locationsList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        this.locationsList = [];
        this.pageMaxLimit = 1;
        console.log('err getDataFilteredByName', err);
        this.showLoader = false;
      }
    });
  }

  orderListBy(option: string): void {
    this.showLoader = true;
    this.orderBy = option;
    switch (option) {
      case 'Name Asc':
        this.locationsList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 'Name Desc':
        this.locationsList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        break;
      case 'Type Asc':
        this.locationsList.sort((a, b) => {
          const typeA = a.type.toLowerCase();
          const typeB = b.type.toLowerCase();
          if (typeA < typeB) return -1;
          if (typeA > typeB) return 1;
          return 0;
        });
        break;
      case 'Type Desc':
        this.locationsList.sort((a, b) => {
          const typeA = a.type.toLowerCase();
          const typeB = b.type.toLowerCase();
          if (typeA > typeB) return -1;
          if (typeA < typeB) return 1;
          return 0;
        });
        break;
    }
    this.showLoader = false;
  }

}

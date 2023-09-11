import { Component } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  public page: number = 1;
  public pageMaxLimit: number = 0;
  public charactersList: Character[] = [];
  public navigatorOptions: number[] = [];
  public showLoader = false;
  public orderBy = 'Name Asc';
  public nameToFilter = '';

  constructor(
    private _characterService: CharacterService,
  ) {
    this.getCharactersData();
  }

  getCharactersData(): void {
    this.showLoader = true;
    this._characterService.getAllCharacters(this.page).subscribe({
      next: response => {
        this.charactersList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        console.log('err getCharactersData', err);
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

  updateIndexCharacterTable(pageNumber: number): void {
    if (
      pageNumber == this.page ||
      pageNumber < 1 ||
      pageNumber > this.pageMaxLimit
    ) return;
    this.page = pageNumber;
    this.getCharactersData();
  }

  showCharacterDetails(id: string): void {
    let url = `/characterDetails/${id}`;
    window.open(url, "_blank");
  }

  getDataFilteredByName(): void {
    this.showLoader = true;
    this._characterService.getAllCharactersWithFilterName(this.nameToFilter).subscribe({
      next: response => {
        this.charactersList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        this.charactersList = [];
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
        this.charactersList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 'Name Desc':
        this.charactersList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        break;
      case 'Status Asc':
        this.charactersList.sort((a, b) => {
          const statusA = a.status.toLowerCase();
          const statusB = b.status.toLowerCase();
          if (statusA < statusB) return -1;
          if (statusA > statusB) return 1;
          return 0;
        });
        break;
      case 'Status Desc':
        this.charactersList.sort((a, b) => {
          const statusA = a.status.toLowerCase();
          const statusB = b.status.toLowerCase();
          if (statusA > statusB) return -1;
          if (statusA < statusB) return 1;
          return 0;
        });
        break;
    }
    this.showLoader = false;
  }

}

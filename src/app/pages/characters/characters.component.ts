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

  constructor(
    private _characterService: CharacterService,
  ) {
    this.getCharactersData();
  }

  getCharactersData(): void {
    this._characterService.getAllCharacters(this.page).subscribe({
      next: response => {
        console.log(response);
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
    let url = `/characters/${id}`;
    window.open(url, "_blank");
  }

  
}

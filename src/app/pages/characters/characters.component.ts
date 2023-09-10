import { Component } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent {

  private page = '1';
  public charactersList: Character[] = [];

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
      },
      error: err => {
        console.log('err getCharactersData', err);
      }
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {
  public characterData!: Character;
  public dataLoaded: boolean = false;

  constructor (
    private _characterService: CharacterService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        console.log('params[id]',params['id']);
        this._characterService.getCharacterById(params['id']).subscribe(result => {
          console.log('result',result);
          this.characterData = result;
          this.dataLoaded = true;
        });
      } else this._router.navigate(['/']);
    });
  }
}

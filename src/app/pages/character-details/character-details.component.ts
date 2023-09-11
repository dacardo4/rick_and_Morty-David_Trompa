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
        this._characterService.getCharacterById(params['id']).subscribe(result => {
          this.characterData = result;
          this.dataLoaded = true;
        });
      } else this._router.navigate(['/']);
    });
  }

  viewDataFromLocation(urlReceived: string): void {
    let id = urlReceived.split('location/')[1];
    let url = `/locationDetails/${id}`;
    window.open(url, "_blank");
  }
}

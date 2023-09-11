import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CharacterCardComponent implements OnInit {

  @Input() resident: string = '';
  public dataLoaded: boolean = false;
  public characterData!: Character;

  constructor (
    private _characterService: CharacterService,
  ) { }
  
  ngOnInit(): void {
    let id = this.resident.split('character/')[1];
    this._characterService.getCharacterById(+id).subscribe(result => {
      this.characterData = result;
      this.dataLoaded = true;
    });
  }

  showCharacterDetails(): void {
    let id = this.resident.split('character/')[1];
    let url = `/characterDetails/${id}`;
    window.open(url, "_blank");
  }
}

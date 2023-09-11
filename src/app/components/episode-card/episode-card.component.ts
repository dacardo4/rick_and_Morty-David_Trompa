import { Component, Input } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css']
})
export class EpisodeCardComponent {
  @Input() episode: string = '';
  public dataLoaded: boolean = false;
  public episodeData!: Episode;

  constructor (
    private _episodesService: EpisodesService,
  ) { }
  
  ngOnInit(): void {
    let id = this.episode.split('episode/')[1];
    this._episodesService.getEpisodeById(+id).subscribe(result => {
      this.episodeData = result;
      this.dataLoaded = true;
    });
  }

  showEpisodeDetails(): void {
    let id = this.episode.split('episode/')[1];
    let url = `/episodeDetails/${id}`;
    window.open(url, "_blank");
  }
}

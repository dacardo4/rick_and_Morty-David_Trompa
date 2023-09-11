import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episode-details',
  templateUrl: './episode-details.component.html',
  styleUrls: ['./episode-details.component.css']
})
export class EpisodeDetailsComponent {
  public episodeData!: Episode;
  public dataLoaded: boolean = false;

  constructor (
    private _episodeService: EpisodesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) {
    this._activatedRoute.params.subscribe(params => {
      if (params['id']) {
        console.log('params[id]',params['id']);
        this._episodeService.getEpisodeById(params['id']).subscribe(result => {
          console.log('result',result);
          this.episodeData = result;
          this.dataLoaded = true;
        });
      } else this._router.navigate(['/']);
    });
  }
}

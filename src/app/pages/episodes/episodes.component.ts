import { Component } from '@angular/core';
import { Episode } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent {

  public page: number = 1;
  public pageMaxLimit: number = 0;
  public episodesList: Episode[] = [];
  public navigatorOptions: number[] = [];
  public showLoader = false;
  public orderBy = 'Name Asc';
  public nameToFilter = '';

  constructor(
    private _episodesService: EpisodesService,
  ) {
    this.getEpisodesData();
  }

  getEpisodesData(): void {
    this.showLoader = true;
    this._episodesService.getAllEpisodes(this.page).subscribe({
      next: response => {
        console.log(response);
        this.episodesList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        this.showLoader = false;
        console.log('err getEpisodesData', err);
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

  updateIndexEpisodeTable(pageNumber: number): void {
    if (
      pageNumber == this.page ||
      pageNumber < 1 ||
      pageNumber > this.pageMaxLimit
    ) return;
    this.page = pageNumber;
    this.getEpisodesData();
  }

  showEpisodeDetails(id: string): void {
    let url = `/episodeDetails/${id}`;
    window.open(url, "_blank");
  }

  getDataFilteredByName(): void {
    this.showLoader = true;
    this._episodesService.getAllEpisodesWithFilterName(this.nameToFilter).subscribe({
      next: response => {
        console.log(response);
        this.episodesList = response.results;
        this.pageMaxLimit = response.info.pages;
        this.calculateNavigator(this.page);
      },
      error: err => {
        this.episodesList = [];
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
        this.episodesList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;
      case 'Name Desc':
        this.episodesList.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA > nameB) return -1;
          if (nameA < nameB) return 1;
          return 0;
        });
        break;
    }
    this.showLoader = false;
  }

}

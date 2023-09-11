import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { LocationComponent } from './pages/location/location.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { EpisodeDetailsComponent } from './pages/episode-details/episode-details.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characterDetails/:id', component: CharacterDetailsComponent },
  { path: 'locations', component: LocationComponent },
  { path: 'locationDetails/:id', component: LocationDetailsComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'episodeDetails/:id', component: EpisodeDetailsComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

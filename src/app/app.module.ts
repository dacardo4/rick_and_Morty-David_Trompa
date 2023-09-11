import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxLoadingModule } from 'ngx-loading';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './pages/location/location.component';
import { LocationDetailsComponent } from './pages/location-details/location-details.component';
import { EpisodesComponent } from './pages/episodes/episodes.component';
import { EpisodeDetailsComponent } from './pages/episode-details/episode-details.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    CharactersComponent,
    CharacterDetailsComponent,
    LocationComponent,
    LocationDetailsComponent,
    EpisodesComponent,
    EpisodeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

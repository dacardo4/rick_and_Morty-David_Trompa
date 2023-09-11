import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CharactersComponent } from './pages/characters/characters.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'characters', component: CharactersComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

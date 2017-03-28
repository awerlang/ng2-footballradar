import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameListComponent } from './game-list/game-list.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    GameComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

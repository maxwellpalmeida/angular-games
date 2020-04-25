import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './tik-tak-toe/board/board.component';
import { SquareComponent } from './tik-tak-toe/square/square.component';
import { GameComponent } from './tik-tak-toe/game/game.component';
import { MineBoardComponent } from './mine-field/mine-board/mine-board.component';
import { GameMineFieldComponent } from './mine-field/game-mine-field/game-mine-field.component';
import { SquareMineFieldComponent } from './mine-field/square-mine-field/square-mine-field.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    GameComponent,
    MineBoardComponent,
    GameMineFieldComponent,
    SquareMineFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

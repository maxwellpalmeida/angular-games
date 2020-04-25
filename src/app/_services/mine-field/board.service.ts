import { Injectable } from '@angular/core';
import { GameLevel } from 'src/app/_DTO/game-mine-field/game-level';
import { Square } from 'src/app/_DTO/game-mine-field/square';
import { GameSettings } from 'src/app/_DTO/game-mine-field/game-settings';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private GameSettings  : GameSettings;
  private squares : Array<Array<Square>>;

  constructor() {
  }

  public generateBoard(level : GameLevel) : Array<Array<Square>> {
    this.LoadGameSettings(level);

    this.squares = new Array(this.GameSettings.rowsSize);
    for(var rowIndex = 0; rowIndex < this.GameSettings.rowsSize; rowIndex++) {
      var row = new Array<any>(this.GameSettings.columnsSize);
        for(var columnIndex = 0; columnIndex < this.GameSettings.columnsSize; columnIndex++) {
          var square = new Square();
          square.IsBomb = this.shouldBeBomb();
          square.SurroundingBombs = 0;
          
          row[columnIndex] = square;          
        } 
        this.squares[rowIndex] = row;
    }

    this.fillSquareCounts();

    return this.squares;
  }

  private fillSquareCounts() {
    debugger;
      for(var rowIndex = 0; rowIndex < this.GameSettings.rowsSize; rowIndex++) {
        for(var columnIndex = 0; columnIndex < this.GameSettings.columnsSize; columnIndex++) {
          if(this.squares[rowIndex][columnIndex].IsBomb == false) {
          
            var SurroundingBombs = 0;
            
            SurroundingBombs += this.ReturnBombCount(rowIndex, columnIndex);
            //Next Row
            if (rowIndex < this.GameSettings.rowsSize - 1)
            {
              SurroundingBombs += this.squares[rowIndex + 1][columnIndex].IsBomb == true ? 1 : 0;
              SurroundingBombs += this.ReturnBombCount(rowIndex + 1, columnIndex);
            }
            //Next Row
            
            //Previous row points
            if (rowIndex > 0)
            {
              SurroundingBombs += this.squares[rowIndex - 1][columnIndex].IsBomb == true ? 1 : 0;
              SurroundingBombs += this.ReturnBombCount(rowIndex - 1, columnIndex);
            }

            //Previous row points
            this.squares[rowIndex][columnIndex].SurroundingBombs = SurroundingBombs;
          }
        }
    }
  }

  private ReturnBombCount(rowIndex, columnIndex){
    var BombsCount = 0;
    if (columnIndex < this.GameSettings.columnsSize - 1)
    {
      if (this.squares[rowIndex][columnIndex + 1].IsBomb) {
        BombsCount++;
      }
    }

    if (columnIndex > 0 && columnIndex <= this.GameSettings.columnsSize - 1)
    {
      if (this.squares[rowIndex][columnIndex - 1].IsBomb) {
        BombsCount++;
      }
    }
    return BombsCount;
  }

  private shouldBeBomb() : boolean {
    var ramdonNumber = this.generateRandomNumber(100); // 30 percent of the squares are supposed to be a bomb
    return (ramdonNumber < this.GameSettings.percentageOfBombs);
  }

  private generateRandomNumber(max_value: number) {
    return Math.floor(Math.random() * max_value); 
  }

  private LoadGameSettings(level : GameLevel) {
    this.GameSettings  = this.GetGameSettings(level);
  }

  private GetGameSettings(level: GameLevel) : GameSettings {
    var settings : GameSettings = new GameSettings();
    switch (level)
    {
      case GameLevel.easy:
        settings.columnsSize = 12;
        settings.rowsSize = 12;
        settings.percentageOfBombs = 30;
        break;

      case GameLevel.medium:
        settings.columnsSize = 25;
        settings.rowsSize = 25;
        settings.percentageOfBombs = 40;
        break;

      case GameLevel.hard:
        settings.columnsSize = 40;
        settings.rowsSize = 40;
        settings.percentageOfBombs = 60;
        break;
    }
    return settings;
  }
}

import { Injectable } from '@angular/core';
import { GameLevel } from 'src/app/_DTO/game-mine-field/game-level';
import { Square } from 'src/app/_DTO/game-mine-field/square';
import { GameSettings } from 'src/app/_DTO/game-mine-field/game-settings';
import { _ }  from "lodash";

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

  public fillSquareCounts() {
      for(var rowIndex = 0; rowIndex < this.GameSettings.rowsSize; rowIndex++) {
        for(var columnIndex = 0; columnIndex < this.GameSettings.columnsSize; columnIndex++) {
          if(this.squares[rowIndex][columnIndex].IsBomb == false) {

            var SurroundingSquares : Array<Square> = this.getSurroundingSquares(rowIndex, columnIndex);
            var SurroundingBombs : number = 0;

            SurroundingSquares.forEach(square => {
              if(square.IsBomb) {
                SurroundingBombs++;
              }
            });
            
            this.squares[rowIndex][columnIndex].SurroundingBombs = SurroundingBombs;
          }
        }
    }
  }

  
  private getRowSurroundingSquares(rowIndex : number, columnIndex : number) : Array<Square> {
    var SurroundingSquares : Array<Square> = new Array<Square>();
    
    if(this.DoesPositionExist(rowIndex, columnIndex)) {
      SurroundingSquares.push(this.squares[rowIndex][columnIndex]);
    }
    if (this.DoesPositionExist(rowIndex, columnIndex + 1)) {
      SurroundingSquares.push(this.squares[rowIndex][columnIndex + 1]);
    }
    if (this.DoesPositionExist(rowIndex, columnIndex - 1)) {
      SurroundingSquares.push(this.squares[rowIndex][columnIndex - 1]);
    }

    return SurroundingSquares;
  }

  private getSurroundingSquares(rowIndex : number, columnIndex : number) : Array<Square> {
    var SurroundingSquares : Array<Square> = new Array<Square>();

    SurroundingSquares = SurroundingSquares.concat(this.getRowSurroundingSquares(rowIndex - 1, columnIndex));
    SurroundingSquares = SurroundingSquares.concat(this.getRowSurroundingSquares(rowIndex, columnIndex));
    SurroundingSquares = SurroundingSquares.concat(this.getRowSurroundingSquares(rowIndex + 1, columnIndex));
    
    return SurroundingSquares;
  }


  private DoesPositionExist(rowIndex : number, columnIndex? : number) : boolean {
    if(columnIndex) {
      if (typeof this.squares[rowIndex] !== 'undefined') {
        return (typeof this.squares[rowIndex][columnIndex] !== 'undefined');
      }
    }

    return (typeof this.squares[rowIndex] !== 'undefined');
  }

  private shouldBeBomb() : boolean {
    return (this.generateRandomNumber(100) < this.GameSettings.percentageOfBombs);
  }

  private generateRandomNumber(max_value: number): number {
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

import { Component, OnInit } from '@angular/core';
import { Square } from 'src/app/_DTO/game-mine-field/square';
import { BoardService } from 'src/app/_services/mine-field/board.service';
import { GameLevel } from 'src/app/_DTO/game-mine-field/game-level';

@Component({
  selector: 'app-mine-board',
  templateUrl: './mine-board.component.html',
  styleUrls: ['./mine-board.component.css']
})
export class MineBoardComponent implements OnInit {

  public IsGameFinished: boolean;
  public squares : Array<Array<Square>>;
  public status: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.squares = this.boardService.generateBoard(GameLevel.easy);
  }

  public handleClick(rowIndex, columnIndex) {
    var val = this.squares[rowIndex][columnIndex];
    val.IsVisible = true;
    val.WasClicked = true;

    if (val.IsBomb == true) {
      debugger;
       this.status = "You hit a bomb. You lost, looser."; 
       this.exposeAllBombs();
    }

    if (this.isGameFinished()) {
      this.IsGameFinished = true;
      this.status = "Congrats pal. You won!"; 
    }
  }

  private exposeAllBombs() {
      this.squares.forEach(function(itemRow){
        itemRow.forEach(function(itemColumn){
          if (itemColumn.IsBomb == true) {
            itemColumn.IsVisible = true;
          }
        });
    });
  }

  private isGameFinished() : boolean {
    var AreAllBlocksOpened = true;

    this.squares.forEach(function(itemRow){
      itemRow.forEach(function(itemColumn){
        if(itemColumn.IsBomb == false){
          if(itemColumn.IsVisible == false){
            AreAllBlocksOpened = false;
          }
        }
      });
    });

    return AreAllBlocksOpened;
  }

 
}

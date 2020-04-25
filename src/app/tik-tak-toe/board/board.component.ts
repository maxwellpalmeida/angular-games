import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public status: string;
  public squares: string[];
  public xIsNext: boolean;

  constructor() { }

  ngOnInit(): void {
    this.squares = new Array(9);
    this.squares.fill(null);
  }

  onGameMove(index : number) {
    const squaresConst = this.squares.slice();
    if (this.calculateWinner(squaresConst) || squaresConst[index]) {
      return;
    }
    squaresConst[index] = this.xIsNext ?  'X' : 'O';

    this.squares = squaresConst;
    this.xIsNext = !this.xIsNext;

    this.updateStatus();
  }

  private updateStatus() {
    const winner = this.calculateWinner(this.squares);
    
    if (winner) {
      this.status = 'Winner: ' + winner;
    } else {
      this.status = 'Next player: ' + (this.xIsNext ? 'X' : 'O');
    }
  }

  private calculateWinner(squares : string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() value: number;
  @Output() clicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.clicked.emit(this.value);
  }
}

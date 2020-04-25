import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-square-mine-field',
  templateUrl: './square-mine-field.component.html',
  styleUrls: ['./square-mine-field.component.css']
})
export class SquareMineFieldComponent implements OnInit {

  @Input() value: number;
  @Input() customClass: string[];
  @Output() clicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  click() {
    this.clicked.emit(this.value);
  }

}

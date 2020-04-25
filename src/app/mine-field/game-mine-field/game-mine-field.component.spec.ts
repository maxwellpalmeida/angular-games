import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMineFieldComponent } from './game-mine-field.component';

describe('GameMineFieldComponent', () => {
  let component: GameMineFieldComponent;
  let fixture: ComponentFixture<GameMineFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameMineFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameMineFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

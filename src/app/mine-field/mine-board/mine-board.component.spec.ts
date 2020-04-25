import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MineBoardComponent } from './mine-board.component';

describe('MineBoardComponent', () => {
  let component: MineBoardComponent;
  let fixture: ComponentFixture<MineBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MineBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MineBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareMineFieldComponent } from './square-mine-field.component';

describe('SquareMineFieldComponent', () => {
  let component: SquareMineFieldComponent;
  let fixture: ComponentFixture<SquareMineFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareMineFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareMineFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

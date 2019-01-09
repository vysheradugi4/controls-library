import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRangeInputComponent } from './number-range-input.component';

describe('NumberRangeInputComponent', () => {
  let component: NumberRangeInputComponent;
  let fixture: ComponentFixture<NumberRangeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberRangeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveIntegerInputComponent } from './positive-integer-input.component';

describe('PositiveNumbersInputComponent', () => {
  let component: PositiveIntegerInputComponent;
  let fixture: ComponentFixture<PositiveIntegerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiveIntegerInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveIntegerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

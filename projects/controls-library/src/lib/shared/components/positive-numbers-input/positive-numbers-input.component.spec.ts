import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveNumbersInputComponent } from './positive-numbers-input.component';

describe('PositiveNumbersInputComponent', () => {
  let component: PositiveNumbersInputComponent;
  let fixture: ComponentFixture<PositiveNumbersInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ], 
      declarations: [ PositiveNumbersInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveNumbersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

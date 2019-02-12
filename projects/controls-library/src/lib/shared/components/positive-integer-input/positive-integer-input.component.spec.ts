import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PositiveIntegerInputComponent } from './positive-integer-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { tick } from '@angular/core/src/render3';

describe('PositiveIntegerInputComponent', () => {
  let component: PositiveIntegerInputComponent;
  let fixture: ComponentFixture<PositiveIntegerInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [PositiveIntegerInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveIntegerInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // <positive-integer-input
  //     containerClass="input-group"
  //     inputId="positiveIntegerInput"
  //     controlClass="positive-integer-input"
  //     formControlName="positiveInteger"
  //     placeholder="0"
  //     [allowLeadingNil]="false"
  //     [prefix]="positiveIntegerInputLabel"
  //     [suffix]="positiveIntegerInputError"
  //     [additionalClass]="form.get('positiveInteger').hasError('required') ? 'additional-class' : ''">
  // </positive-integer-input>

  /**
   * Placeholder testing.
   */
  it(`should show empty placeholder input field`, () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('');
  });

  it(`should show empty placeholder input field`, () => {
    component.placeholder = '';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('');
  });

  it(`should show empty placeholder input field`, () => {
    component.placeholder = null;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('');
  });

  it(`should show empty placeholder input field`, () => {
    component.placeholder = undefined;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('');
  });

  it(`should show placeholder input field as 'placeholder' string`, () => {
    component.placeholder = 'placeholder';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('placeholder');
  });

  it('should hide placeholder when input in focus', () => {
    const input = fixture.nativeElement.querySelector('input');
    component.placeholder = 'placeholder in focus';
    input.dispatchEvent(new Event('focus'));

    fixture.detectChanges();

    expect(input.placeholder).toEqual('');
  });

  it('should show placeholder when input in focus then in blur', () => {
    const input = fixture.nativeElement.querySelector('input');
    component.placeholder = 'placeholder in blur';
    input.dispatchEvent(new Event('focus'));
    input.dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(input.placeholder).toEqual('placeholder in blur');
  });

  it('should show placeholder when input disabled', () => {
    const input = fixture.nativeElement.querySelector('input');
    component.placeholder = 'placeholder disabled';

    component.setDisabledState(true);

    fixture.detectChanges();

    expect(input.placeholder).toEqual('placeholder disabled');
  });

  it('should show placeholder after second init', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('input');
    component.placeholder = 'placeholder';
    fixture.detectChanges();

    component.placeholder = 'async placeholder';
    fixture.detectChanges();

    expect(input.placeholder).toEqual('async placeholder');
  }));
});

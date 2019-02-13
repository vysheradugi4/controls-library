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



  /**
   * Write Value.
   */

  it('should show empty string in input when wrote value is null', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(null);
    fixture.detectChanges();

    expect(input.value).toEqual('');
  });

  it('should show empty string in input when wrote value is undefined', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(undefined);
    fixture.detectChanges();

    expect(input.value).toEqual('');
  });

  it('should show empty string in input when wrote value is minus', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(-4);
    fixture.detectChanges();

    expect(input.value).toEqual('');
  });

  it('should show 0 in input when wrote value is 0', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(0);
    fixture.detectChanges();

    expect(input.value).toEqual('0');
  });

  it('should show 1 in input when wrote value is 1', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(1);
    fixture.detectChanges();

    expect(input.value).toEqual('1');
  });

  it('should show 100500 in input when wrote value is 100500', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.writeValue(100500);
    fixture.detectChanges();

    expect(input.value).toEqual('100500');
  });

  it('should show 1 in input when wrote value is 1 and then `a` (tests last value)', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.onChange('1');
    fixture.detectChanges();

    component.onChange('1a');
    fixture.detectChanges();

    expect(input.value).toEqual('1');
  });

  it('should show 1 in input when wrote value is minus and then 1 (tests last value)', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.onChange('-');
    fixture.detectChanges();

    component.onChange('1');
    fixture.detectChanges();

    expect(input.value).toEqual('1');
  });

  it('should change value in input to 100 after second init', fakeAsync(() => {
    const input = fixture.nativeElement.querySelector('input');
    component.onChange('2');
    fixture.detectChanges();

    component.writeValue(100);
    fixture.detectChanges();

    expect(input.value).toEqual('100');
  }));

  it('should allow leading nil by default', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.onChange('0123');
    fixture.detectChanges();

    expect(input.value).toEqual('0123');
  });

  it('should prevent leading nil', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.allowLeadingNil = false;
    fixture.detectChanges();

    component.onChange('0123');
    fixture.detectChanges();

    expect(input.value).toEqual('123');
  });

  it('should send to form value and subscribers 1', () => {
    const input = fixture.nativeElement.querySelector('input');

    component.onChange('1');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should send to form value and subscribers 1', () => {
    component.writeValue(1);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should send to form value and subscribers null, allowLeadingNull is on', () => {
    component.writeValue(0);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should send to form value and subscribers 0', () => {
    component.onChange('0');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should send to form value and subscribers 1 after enter 1 and then `a`', () => {
    component.onChange('1');
    fixture.detectChanges();

    component.onChange('1a');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should set input value as 12 when formControl are disabled', () => {
    component.setDisabledState(true);
    component.writeValue(12);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(12);
  });

  it('should set input value as 12 when formControl are disabled, and after change value to 14', () => {
    component.setDisabledState(true);
    component.writeValue(12);
    fixture.detectChanges();

    component.writeValue(14);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(14);
  });
});

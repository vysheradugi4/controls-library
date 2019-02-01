import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyInputComponent } from './currency-input.component';
import { tick } from '@angular/core/src/render3';

describe('CurrencyInputComponent', () => {
  let component: CurrencyInputComponent;
  let fixture: ComponentFixture<CurrencyInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [CurrencyInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // <currency-input
  //   containerClass = "input-group"
  //   inputId = "currencyInput"
  //   controlClass = "currency-input"
  //   formControlName = "currency"
  //   placeholder="0"
  //   [positive] = "true"
  //   [locale] = "'en-US'"
  //   [prefix] = "currencyInputLabel"
  //   [suffix] = "currencyInputError"
  //   [additionalClass] = "form.get('currency').hasError('required') ? 'additional-class' : ''" >
  // </currency-input>

  // Placeholder

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

  it(`should show in placeholder input field 0.00 for "en-US" locale`, () => {
    component.placeholder = '0';
    component.locale = 'en-US';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('0.00');
  });

  it(`should show in placeholder input field 0,00 for "de-DE" locale`, () => {
    component.placeholder = '0';
    component.locale = 'de-DE';
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').placeholder).toEqual('0,00');
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


  // Currency number

  it('should set 0.00 in input when get 0 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(0);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('0.00');
  });

  it('should set 0,00 in input when get 0 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(0);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('0,00');
  })

  it('should set 1.00 in input when get 1 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(1);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.00');
  });

  it('should set 1,00 in input when get 1 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(1);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1,00');
  })

  it('should set 1,234.00 in input when get 1234 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(1234);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1,234.00');
  });

  it('should set 1.234,00 in input when get 1234 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(1234);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.234,00');
  });

  it('should set 1,234.22 in input when get 1234.22 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(1234.22);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1,234.22');
  });

  it('should set 1.234,22 in input when get 1234.22 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(1234.22);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.234,22');
  });

  it('should set 1,234.22 in input when get 1234.222 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(1234.222);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1,234.22');
  });

  it('should set 1.234,22 in input when get 1234.222 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(1234.222);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.234,22');
  });

  it('should set 1,234.56 in input when get 1234.559 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.writeValue(1234.559);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1,234.56');
  });

  it('should set 1.234,56 in input when get 1234.559 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.writeValue(1234.559);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toEqual('1.234,56');
  });

  // it('should return null to formControl value when get null', () => {
  //   fixture.detectChanges();

  //   component.writeValue(null);
  //   fixture.detectChanges();

  //   expect(component.state.valueNumber).toEqual(null);
  // });

  it('should return 0 to formControl value when get 0', () => {
    fixture.detectChanges();

    component.writeValue(0);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should return 1 to formControl value when get 1', () => {
    fixture.detectChanges();

    component.writeValue(1);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1234 to formControl value when get 1234', () => {
    fixture.detectChanges();

    component.writeValue(1234);
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1234);
  });

  it('should return 0 when user enter 0', () => {
    fixture.detectChanges();

    component.onChange('0');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should return 0 when user enter 0 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.onChange('0');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should return 0 when user enter 0 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.onChange('0');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(0);
  });

  it('should return 1 when user enter 1', () => {
    fixture.detectChanges();

    component.onChange('1');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1 when user enter 1 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.onChange('1');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1 when user enter 1 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.onChange('1');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1 when user enter 1.00 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.onChange('1.00');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1 when user enter 1,00 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.onChange('1,00');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1);
  });

  it('should return 1234 when user enter 1234.00 for "en-US" locale', () => {
    component.locale = 'en-US';
    fixture.detectChanges();

    component.onChange('1234.00');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1234);
  });

  it('should return 1234 when user enter 1234,00 for "de-DE" locale', () => {
    component.locale = 'de-DE';
    fixture.detectChanges();

    component.onChange('1234,00');
    fixture.detectChanges();

    expect(component.state.valueNumber).toEqual(1234);
  });

  // it('should return null when user delete all characters', () => {
  //   fixture.detectChanges();

  //   component.onChange('');
  //   fixture.detectChanges();

  //   expect(component.state.valueNumber).toEqual(null);
  // });


  // it('should set empty input when get null', () => {
  //   fixture.detectChanges();

  //   component.writeValue(0);
  //   fixture.detectChanges();

  //   const input = fixture.nativeElement.querySelector('input');
  //   expect(input.value).toEqual('');
    
  // });
  
  // it('should set empty input when get undefined', () => {
  //   fixture.detectChanges();

  //   component.writeValue(undefined);
  //   fixture.detectChanges();

  //   const input = fixture.nativeElement.querySelector('input');
  //   expect(input.value).toEqual('');
    
  // });

  // it('should set empty input when get empty string', () => {
  //   console.log('fffffffffff', component.writeValue(''));
  //   expect(component.writeValue('')).toThrow(new Error('Input value must be a number.'));
    
  // });
});

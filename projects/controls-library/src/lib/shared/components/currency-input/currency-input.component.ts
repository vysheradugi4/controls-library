import { Component, OnInit, Input, TemplateRef, forwardRef, Inject, LOCALE_ID, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CurrencyInputComponent),
    },
  ],
})
export class CurrencyInputComponent implements OnInit, ControlValueAccessor {

  @ViewChild('inputControl') public inputControl: ElementRef;

  public formControl: FormControl;
  public disabled: boolean;
  public touched: Function;
  public value: string;

  /**
   * Css class name for div container.
   */
  @Input() public containerClass: string;


  /**
   * Css class name for input.
   */
  @Input() public controlClass: string;


  /**
   * Additional css class for input.
   */
  @Input() public additionalClass: string;


  /**
   * Input form field id.
   */
  @Input() public inputId: string;


  /**
   * Input placeholder.
   */
  @Input() public placeholder: string;


  /**
   * Template prefix before input form control.
   */
  @Input() public prefix: TemplateRef<any>;


  /**
   * Template suffix after input form control.
   */
  @Input() public suffix: TemplateRef<any>;


  /**
   * Current locale.
   */
  @Input() public locale: string;


  /**
   * Only positive or positive and negative numbers.
   */
  @Input() public positive = false;


  private _lastValue: string;
  private _localeDecimalSeparator: string;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private change: Function;


  constructor(
    @Inject(LOCALE_ID) private _appLocale: string
  ) { }


  ngOnInit() {
    this.change = (value: string) => { };
    this.touched = () => { };

    this._localeDecimalSeparator = (1.1)
      .toLocaleString(this.locale).substring(1, 2);

    this.locale = this.locale || this._appLocale;

    /**
     * Setup placeholder. When 0 (nil) will be shown with two decimals
     * and locale decimal separator.
     */
    if (this.placeholder === '0') {
      this.placeholder = `0${this._localeDecimalSeparator}00`;
    }

    this.formControl = new FormControl();

    this.formControl.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((value: string) => {
        this.onChange(value);
      });
  }


  public onChange(value: string) {

    if (!(this.validDecimal(value))) {
      const cursorPosition = this.inputControl.nativeElement.selectionStart - 1;

      this.formControl.setValue(this._lastValue);

      this.inputControl.nativeElement.selectionStart = cursorPosition;
      this.inputControl.nativeElement.selectionEnd = cursorPosition;
      return;
    }

    if (isNaN(this.localeDecimalToNumber(value))) {

      if (value === '-' || value === this._localeDecimalSeparator) {
        this._lastValue = value;
        return;
      }

      this._lastValue = '';

      this.change(this._lastValue);
      return;
    }

    this.change(value === '' ? '' : this.localeDecimalToNumber(value));
    this.value = value;
    this._lastValue = value;
  }


  public onTouched() {
    const valueWithDecimals = this.addTwoDecimal(this.value);
    this.formControl.setValue(valueWithDecimals);
    this.touched();
  }


  writeValue(value: number): void {
    const newValue = value || value === 0 ? value.toLocaleString(this.locale) : '';

    this.formControl.setValue(newValue);

    this._lastValue = newValue;
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }


  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
      return;
    }

    this.formControl.enable();
  }


  private validDecimal(value: string) {
    let re: RegExp;

    if (this.positive) {
      re = new RegExp('^\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');
    } else {
      re = new RegExp('^-?\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');
    }

    return re.test(value);
  }


  /**
   * Convert string with locale number (comma separator) to number.
   * @param str String for convert.
   * @returns Number.
   */
  private localeDecimalToNumber(str: string): number {
    if (!str) {
      return 0;
    }

    return parseFloat(str.replace(',', '.'));
  }


  /**
   * For add two decimals to input value.
   * @param num String with number in locale version.
   * @returns String with number in locale version (locale decimal separator,
   * comma or dot).
   */
  private addTwoDecimal(num: string): string {
    const numberValue = this.localeDecimalToNumber(num);

    const res = num.split(this._localeDecimalSeparator);

    if (res.length === 1 || res[1].length < 2) {
      return numberValue.toLocaleString(this.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return num;
  }
}

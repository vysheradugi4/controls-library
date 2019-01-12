import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef, forwardRef, Inject, LOCALE_ID } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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

  public value: string;
  public disabled: boolean;
  public touched: Function;

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


  private _lastValue: string;
  private _localeDecimalSeparator: string;
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

    this.inputControl.nativeElement.placeholder = this.placeholder || '';
  }


  public onChange(value: string) {

    if (!(this.validDecimal(value))) {
      const cursorPosition = this.inputControl.nativeElement.selectionStart - 1;

      this.inputControl.nativeElement.value = this._lastValue;

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
    this._lastValue = value;
  }


  writeValue(value: string): void {
    this.value = isNaN(+value) ? value : '';

    this._lastValue = this.value;
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }


  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  private validDecimal(value: string) {
    const re = new RegExp('^-?\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');
    return re.test(value);
  }


  /**
   * Convert string with locale number (comma separator) to number.
   * @param str String for convert.
   * @returns Number.
   */
  public localeDecimalToNumber(str: string): number {
    if (!str) {
      return 0;
    }

    return parseFloat(str.replace(',', '.'));
  }
}

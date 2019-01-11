import { Component, OnInit, Input, ViewChild, ElementRef, TemplateRef, forwardRef } from '@angular/core';
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
  @Input() set placeholder(str: string) {
    if (str) {
      this.inputControl.nativeElement.placeholder = str;
    }
  }


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
  private change: Function;


  constructor(

  ) { }


  ngOnInit() {
    this.change = (value: string) => { };
    this.touched = () => { };
  }


  public onChange(value: string) {
    if (!(this.validDecimal(value))) {
      this.inputControl.nativeElement.value = this._lastValue;
      return;
    }
  }


  writeValue(value: string): void {
    this.value = this.validDecimal(value) ? value : '';

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
    return /^-?\d*[.,]?\d{0,2}$/.test(value);
  }
}

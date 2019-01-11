import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'number-range-input',
  templateUrl: './number-range-input.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NumberRangeInputComponent),
    },
  ],
})
export class NumberRangeInputComponent implements OnInit, ControlValueAccessor {

  public value: string;
  public disabled: boolean;
  public touched: Function;

  @ViewChild('inputControl') public inputControl: ElementRef;


  /**
   * Div container css class.
   */
  @Input() public containerClass: string;


  /**
   * Input form field id.
   */
  @Input() public inputId: string;


  /**
   * Css class name for input.
   */
  @Input() public controlClass = '';


  /**
   * Additional css class for input.
   */
  @Input() public additionalClass: string;


  /**
   * Min and max values setter.
   */
  @Input() public set range(strRange: string) {
    const rangeArray = strRange.split('..').map(str => +str);
    this._min = rangeArray[0];
    this._max = rangeArray[1];
  }


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


  private change: Function;
  private _lastValue: string;
  private _min: number;
  private _max: number;


  constructor() { }


  ngOnInit() {
    if (isNaN(this._max) || isNaN(this._min)) {
      throw new Error('Range required or values error');
    }

    if (this._min >= this._max) {
      throw new Error('Wrong range');
    }

    this.change = (value: string) => { };
    this.touched = () => { };
  }


  public onChange(value: string) {
    // Positive and negative.
    if (!(this.validNumber(value))) {
      this.inputControl.nativeElement.value = this._lastValue;
      return;
    }

    if (+value > this._max || (+value < this._min && this._min < 0)) {
      this.inputControl.nativeElement.value = this._lastValue;
      return;
    }

    if (+value < this._min || isNaN(+value)) {
      this._lastValue = '';
      this.change(this._lastValue);
      return;
    }

    this.change(value === '' ? '' : +value);
    this._lastValue = value;
  }


  writeValue(value: string): void {
    this.value = this.validNumber(value) ? value : '';

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

  /**
   * Depends on min (positive or negative)
   */
  private validNumber(value: string): boolean {
    // Include negative
    if (this._min < 0) {
      return /^-?\d*$/.test(value);
    }

    return /^\d*$/.test(value);
  }
}

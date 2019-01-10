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
    const rangeArray = strRange.split('..').map(value => +value);
    this._min = rangeArray[0];
    this._max = rangeArray[1];
  }


  /**
   * Input placeholder.
   */
  @Input() set placeholder(value: string) {
    if (value) {
      this.inputControl.nativeElement.placeholder = value;
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


  public onChange(event: any) {
    const value = event.target.value;
    if (value === '' || (value === '-' && this._min < 0)) {
      this.value = value;
      this._lastValue = this.value;
      this.change('');
      return;
    }

    if (
      isNaN(+value) ||

      // More than max when max are positive
      (+value > this._max && this._max > 0) ||

      // Less than min when min are negative
      (+value < this._min && this._min < 0) ||

      // Positive when max are negative
      (+value > 0 && this._max < 0) ||

      // Remove few characters
      event.data === '.' ||
      event.data === ',' ||
      event.data === ' '
    ) {
      this.value = this._lastValue;
      this.inputControl.nativeElement.value = this.value;
      this.change(+this.value);
      return;
    }

    if (+value < this._min || (+value > this._max && this._max < 0)) {
      this.value = value;
      this._lastValue = this.value;
      this.change('');
      return;
    }

    this.value = value;
    this._lastValue = this.value;
    this.change(+this.value);
  }


  writeValue(value: string): void {
    this.value = value || '0';

    if (isNaN(+value) || +value < this._min || +value > this._max) {
      this.value = '0';
    }

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
}

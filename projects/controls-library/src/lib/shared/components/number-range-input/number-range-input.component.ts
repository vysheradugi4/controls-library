import { Component, OnInit, Input, forwardRef } from '@angular/core';
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
  public disable: boolean;
  public touched: Function;

  /**
   * Css class name for input.
   */
  @Input() public controlClass: string;


  /**
   * Min limit of range.
   */
  @Input() public minValue: number;


  /**
   * Max limit of range.
   */
  @Input() public maxValue: number;


  private change: Function;


  constructor() { }


  ngOnInit() {
    this.change = (value: string) => { };
    this.touched = () => { };
  }


  public onChange(value: string) {
    this.value = value;
    this.change(value);
  }


  writeValue(value: string): void {
    this.value = value || '';
  }


  registerOnChange(fn: any): void {
    this.change = fn;
  }


  registerOnTouched(fn: any): void {
    this.touched = fn;
  }


  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled;
  }
}

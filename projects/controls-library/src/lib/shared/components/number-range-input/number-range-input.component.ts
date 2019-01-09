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


  /**
   * Input placeholder.
   */
  @Input() public placeholder = '';


  /**
   * Template suffix after input form control.
   */
  @Input() public suffix: TemplateRef<any>;


  private change: Function;
  private lastValue: string;


  constructor() { }


  ngOnInit() {
    this.change = (value: string) => { };
    this.touched = () => { };
  }


  public onChange(value: string) {
    if (isNaN(+value) || +value < this.minValue || +value > this.maxValue) {
      this.value = this.lastValue;
      this.inputControl.nativeElement.value = this.value;
      return;
    }

    this.value = value;
    this.lastValue = this.value;
    this.change(+value);
  }


  writeValue(value: string): void {

    this.value = value;

    if (isNaN(+value) || +value < this.minValue || +value > this.maxValue) {
      this.value = '0';
    }

    this.lastValue = this.value;
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

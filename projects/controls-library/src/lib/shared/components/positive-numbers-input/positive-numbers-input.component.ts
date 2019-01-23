import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ValueState } from '../../models/value-state.model';



@Component({
  // tslint:disable-next-line:component-selector
  selector: 'positive-numbers-input',
  templateUrl: './positive-numbers-input.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PositiveNumbersInputComponent),
    },
  ],
})
export class PositiveNumbersInputComponent implements OnInit, ControlValueAccessor {

  public state: ValueState = new ValueState();

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
   * Allow leading nil.
   */
  @Input() public leadingNil = true;


  private change: Function;


  constructor() { }


  ngOnInit() {
    this.change = (value: string) => value;
    this.touched = () => { };
  }


  public onChange(value: string) {
    // Positive.
    if (!(this.validNumber(value))) {
      const cursorPosition = this.inputControl.nativeElement.selectionStart - 1;

      this.inputControl.nativeElement.value = this._lastValue;

      this.inputControl.nativeElement.selectionStart = cursorPosition;
      this.inputControl.nativeElement.selectionEnd = cursorPosition;
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


  private validNumber(value: string): boolean {
    return /^\d*$/.test(value);
  }
}

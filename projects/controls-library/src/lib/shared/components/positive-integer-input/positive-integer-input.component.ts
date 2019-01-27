import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ValueState } from '../../models/value-state.model';
import { ValidPositiveInteger, LeadingNil, NaNToNilAndEmptyString } from './../../helpers/chains.helper';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'positive-integer-input',
  templateUrl: './positive-integer-input.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PositiveIntegerInputComponent),
    },
  ],
})
export class PositiveIntegerInputComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public state: ValueState = new ValueState();
  public touched: Function;
  public formControl: FormControl;

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
      this._placeholder = str;
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
  @Input() public allowLeadingNil = true;


  private change: Function;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();
  private _placeholder: string;
  private _focus: boolean;

  constructor() { }


  ngOnInit() {
    this.change = (value: string) => { };
    this.touched = () => { };

    this.formControl = new FormControl();

    this.formControl.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((value: string) => {
        this.onChange(value);
      });

    /**
     * Setup placeholder
     */
    this.setPlaceholder();
  }


  public onChange(valueString: string) {

    this.state.dirtyStringLoad(valueString);

    // Chains
    const check1 = new ValidPositiveInteger();
    const check2 = new NaNToNilAndEmptyString();
    const check3 = new LeadingNil(this.allowLeadingNil);

    check1.successor = check2;
    check2.successor = check3;

    this.state = check1.handleState(this.state);
    this.state = check2.handleState(this.state);
    this.state = check3.handleState(this.state);

    this.publishState(this.state);
  }


  public onFocus() {
    this._focus = true;
    this.setPlaceholder();
    this.onChange(this.state.valueString);
  }


  public onBlur() {
    this._focus = false;
    this.setPlaceholder();
    this.onChange(this.state.valueString);
    this.touched();
  }


  writeValue(value: number): void {
    this.onChange(value ? value.toString() : '');
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


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }


  private setPlaceholder() {

    if (this._focus) {
      this.inputControl.nativeElement.placeholder = '';
      return;
    }

    this.inputControl.nativeElement.placeholder = this._placeholder;
  }


  private publishState(state: ValueState) {

    const cursorPosition = this.inputControl.nativeElement.selectionStart + state.changeCursorPosition;

    // Publish to input.
    this.formControl.setValue(state.valueString, { emitEvent: false });

    this.inputControl.nativeElement.selectionStart = cursorPosition;
    this.inputControl.nativeElement.selectionEnd = cursorPosition;

    this.state.changeCursorPosition = 0;

    // Publish to system.
    this.change(state.valueNumber);
  }
}

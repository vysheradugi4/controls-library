import { OnInit, OnDestroy, ViewChild, ElementRef, Input, TemplateRef } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ValueState } from './../models/value-state.model';


export abstract class BaseComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public state: ValueState = new ValueState();
  public touched: Function = () => { };
  public change: Function = (value: string) => { };
  public formControl: FormControl = new FormControl();

  public _unsubscribe: Subject<boolean> = new Subject<boolean>();
  public _placeholder = '';
  public _focus = false;

  @ViewChild('inputControl') public inputControl: ElementRef;


  /**
   * Div container css class (optional)
   */
  @Input() public containerClass?= '';


  /**
   * Input form field id.
   */
  @Input() public inputId: string;


  /**
   * Css class name for input (optional).
   */
  @Input() public controlClass?= '';


  /**
   * Additional css class for input (optional).
   */
  @Input() public additionalClass = '';


  /**
   * Input placeholder.
   */
  @Input() set placeholder(str: string) {
    if (str) {
      this._placeholder = str;
    } else {
      this._placeholder = '';
    }

    this.setPlaceholder();
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

  constructor() { }

  ngOnInit() {

    this.formControl.valueChanges.pipe(
      takeUntil(this._unsubscribe)
    )
      .subscribe((value: string) => {
        this.onChange(value);
      });

    this.setPlaceholder();
  }


  public onChange(value: string) { }


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


  writeValue(value: string): void {
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


  public setPlaceholder() { }


  public publishState(state: ValueState) {

    const cursorPosition = this.inputControl.nativeElement.selectionStart + state.changeCursorPosition;

    // Publish to input.
    this.formControl.setValue(state.valueString, { emitEvent: false });

    this.inputControl.nativeElement.selectionStart = cursorPosition;
    this.inputControl.nativeElement.selectionEnd = cursorPosition;

    this.state.changeCursorPosition = 0;

    // Publish to system.
    this.change(state.valueNumber);
  }


  ngOnDestroy() {
    this._unsubscribe.next(true);
    this._unsubscribe.unsubscribe();
  }
}

import { Component, OnInit, Input, forwardRef, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ValueState } from '../../models/value-state.model';
import { ValidPositiveNumber, NaNToNil, LeadingNil } from './../../helpers/chains.helper';


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
  @Input() public allowLeadingNil = true;


  private change: Function;
  private _unsubscribe: Subject<boolean> = new Subject<boolean>();


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
      })
  }


  public onChange(valueString: string) {

    this.state.dirtyStringLoad(valueString);

    console.log('ffffffffff', JSON.stringify(this.state));

    // Chains
    const check1 = new ValidPositiveNumber();
    const check2 = new NaNToNil();
    const check3 = new LeadingNil(this.allowLeadingNil);

    check1.successor = check2;
    check2.successor = check3;

    this.state = check1.handleState(this.state);
    this.state = check2.handleState(this.state);
    this.state = check3.handleState(this.state);

    console.log('zzzzzzzzzz', JSON.stringify(this.state));

    this.publishState(this.state);
  }


  writeValue(value: number): void {
    this.onChange(value.toString());
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


  private publishState(state: ValueState) {

    // Publish to input.
    this.formControl.setValue(state.valueString, { emitEvent: false });

    // Publish to system.
    this.change(state.valueNumber);
  }
}

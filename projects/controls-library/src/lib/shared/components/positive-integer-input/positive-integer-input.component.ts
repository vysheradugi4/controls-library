import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseComponent } from './../../helpers/base-component';
import { ValidPositiveInteger, NaNToNilAndEmptyString, LeadingNil } from './../../helpers/chains.helper';


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
export class PositiveIntegerInputComponent extends BaseComponent {

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


  public setPlaceholder() {

    if (this._focus) {
      this.inputControl.nativeElement.placeholder = '';
      return;
    }

    this.inputControl.nativeElement.placeholder = this._placeholder;
  }
}

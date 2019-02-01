import { StatePreparer } from './base-chains.helper';
import { ValueState } from '../models/value-state.model';


export class EmptyStringToNil extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (state.valueString === '') {
      state.valueNumber = 0;
      state.valueString = '0';
      state.changeCursorPosition = 1;
    }

    return state;
  }
}


export class ValidPositiveInteger extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (/^\d*$/.test(state.valueString)) {
      state.valueNumber = parseInt(state.valueString, 10);

      // For init lastValueString.
      state.valueString = state.valueString;
      return state;
    }

    state.valueNumber = state.lastValueNumber || 0;
    state.valueString = state.lastValueString || '';
    state.changeCursorPosition = -1;
    return state;
  }
}


export class NaNToNil extends StatePreparer {

  public handleState(state: ValueState) {

    if (isNaN(state.valueNumber)) {
      state.valueNumber = state.lastValueNumber || 0;
      state.valueString = state.lastValueString || '0';
    }

    return state;
  }
}


export class NaNToNilAndEmptyString extends StatePreparer {

  public handleState(state: ValueState) {

    if (isNaN(state.valueNumber)) {
      state.valueNumber = state.lastValueNumber || 0;
      state.valueString = state.lastValueString || '';
    }

    return state;
  }
}


export class MultiNilToOne extends StatePreparer {

  constructor(
    private _allowLeadingNil: boolean = true
  ) {
    super();
  }

  public handleState(state: ValueState) {

    if (!this._allowLeadingNil && /^0+$/.test(state.valueString)) {
      state.valueNumber = 0;
      state.valueString = '0';
    }

    return state;
  }
}


export class LeadingNil extends StatePreparer {

  constructor(
    private _allowLeadingNil: boolean = true
  ) {
    super();
  }

  public handleState(state: ValueState) {

    if (!this._allowLeadingNil && /^0+\d*/.test(state.valueString)) {
      state.valueString = state.valueString.replace(/^0+/, '');
      state.changeCursorPosition = -1;
    }

    return state;
  }
}


export class EmptyStringToNull extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (state.valueString === '') {
      state.valueNumber = null;
      state.changeCursorPosition = 1;
      state.skipNextChecks = true;
    }

    return state;
  }
}

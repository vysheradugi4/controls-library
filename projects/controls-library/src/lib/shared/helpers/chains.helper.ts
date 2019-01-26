import { ValueState } from '../models/value-state.model';


class StatePreparer {
  private _successor: StatePreparer;

  public set successor(successor: StatePreparer) {
    this._successor = successor;
  }

  public get successor() {
    return this._successor;
  }

  public handleState(state: ValueState): void { }
}


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


export class ValidPositiveNumber extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (/^\d*$/.test(state.valueString)) {
      state.valueNumber = parseFloat(state.valueString);

      // For init lastValueString.
      state.valueString = state.valueString;
      return state;
    }

    state.valueNumber = state.lastValueNumber || 0;
    state.valueString = state.lastValueString || '0';
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

    if (!this._allowLeadingNil && /^0+\d+/.test(state.valueString)) {
      state.valueString = state.valueString.replace(/^0+/, '');
      state.changeCursorPosition = -1;
    }

    return state;
  }
}


export class DecimalSeparatorViewResolver extends StatePreparer {

  constructor(
    private _localeDecimalSeparator: string,
  ) {
    super();
  }

  public handleState(state: ValueState) {



    const re = new RegExp('^-?\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');

    if (!re.test(state.valueString)) {
      state.valueNumber = state.lastValueNumber || 0;
      state.valueString = state.lastValueString || '0';
      state.changeCursorPosition = -1;
    }

    return state;
  }
}


export class PrepareCurrencyViewFormat extends StatePreparer {

  constructor(
    private _focus: boolean
  ) {
    super();
  }

  public handleState(state: ValueState) {
    return state;
  }
}

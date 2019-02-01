import { ValueState } from '../models/value-state.model';
import { StatePreparer } from './base-chains.helper';


export class PrepareCurrencyViewFormatWithFocus extends StatePreparer {

  constructor(
    private _focus: boolean,
    private _locale: string
  ) {
    super();
  }

  public handleState(state: ValueState) {

    if (this._focus && state.useGrouping) {
      state.valueString = state.valueNumber
        .toLocaleString(this._locale, { useGrouping: false, minimumFractionDigits: 2, maximumFractionDigits: 2 });
      state.useGrouping = false;
    }

    return state;
  }
}


export class ValidCurrencyNumber extends StatePreparer {

  constructor(
    private _focus: boolean,
    private _localeDecimalSeparator: string,
    private _positive: boolean
  ) {
    super();
  }

  public handleState(state: ValueState) {

    let re: RegExp;

    if (this._positive) {
      re = new RegExp('^\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');
    } else {
      re = new RegExp('^-?\\d*[' + this._localeDecimalSeparator + ']?\\d{0,2}$');
    }

    if (!re.test(state.valueString) && this._focus) {
      state.valueNumber = state.lastValueNumber || 0;
      state.valueString = state.lastValueString || '';
      state.changeCursorPosition = -1;
      return state;
    }

    // For init lastValueString.
    state.valueString = state.valueString;

    state.valueNumber = parseFloat(state.valueString.replace(this._localeDecimalSeparator, '.')) || 0;

    return state;
  }
}


export class PrepareCurrencyViewFormatWithoutFocus extends StatePreparer {

  constructor(
    private _focus: boolean,
    private _locale: string
  ) {
    super();
  }

  public handleState(state: ValueState) {

    if (!this._focus) {
      state.valueString = state.valueNumber
        .toLocaleString(this._locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      state.useGrouping = true;
    }

    return state;
  }
}

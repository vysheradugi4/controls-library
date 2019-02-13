import { ValueState } from '../models/value-state.model';


class StatePreparer {
  private _successor: StatePreparer;

  public set successor(successor: StatePreparer) {
    this._successor = successor;
  }

  public get successor() {
    return this._successor;
  }

  public handle(state: ValueState): ValueState {

    if (state.enteredString === null) {
      return state;
    }

    return this.handleState(state);
  }

  public handleState(state: ValueState): ValueState {
    return state;
  }
}


export class ValidPositiveInteger extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (/^\d*$/.test(state.enteredString)) {
      state.valueNumber = parseInt(state.enteredString, 10);

      // For init lastValueString.
      state.valueString = state.enteredString;
      return state;
    }

    state.valueNumber = state.lastValueNumber || null;
    state.valueString = state.lastValueString || '';
    state.changeCursorPosition = -1;
    return state;
  }
}


export class NaNToNullAndEmptyString extends StatePreparer {

  public handleState(state: ValueState) {

    if (isNaN(state.valueNumber)) {
      state.valueNumber = state.lastValueNumber || null;
      state.valueString = state.lastValueString || '';
      state.enteredString = null;
    }

    return state;
  }
}


export class LeadingNil extends StatePreparer {

  constructor(
    private _allowLeadingNil: boolean
  ) {
    super();
  }

  public handleState(state: ValueState) {

    if (this._allowLeadingNil) {
      return state;
    }

    if (/^0+\d+/.test(state.valueString)) {
      state.valueString = state.valueString.replace(/^0+/, '');
      state.changeCursorPosition = -1;
    }

    return state;
  }
}

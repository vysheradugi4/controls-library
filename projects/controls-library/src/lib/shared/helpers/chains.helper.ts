import { ValueState } from '../models/value-state.model';


class StatePreparer {
  private _successor: StatePreparer;

  public set successor(successor: StatePreparer) {
    this._successor = successor;
  }

  public get successor() {
    return this._successor;
  }

  public handleState(state: ValueState): void { };
}


export class ValidPositiveNumber extends StatePreparer {

  public handleState(state: ValueState): ValueState {

    if (/^\d*$/.test(state.valueString)) {
      state.valueNumber = parseFloat(state.valueString);
      return state;
    }

    state.valueNumber = state.lastValueNumber || 0;
    state.valueString = state.lastValueString || '0';
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


export class LeadingNil extends StatePreparer {

  constructor(
    private _allowLeadingNil: boolean = true
  ) {
    super()
  }

  public handleState(state: ValueState) {

    if (!this._allowLeadingNil) {
      state.valueString = state.valueString.replace(/^0+/, '');
    }

    return state;
  }
}

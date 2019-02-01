import { ValueState } from '../models/value-state.model';


export class StatePreparer {
  private _successor: StatePreparer;

  public set successor(successor: StatePreparer) {
    this._successor = successor;
  }

  public get successor() {
    return this._successor;
  }


  public handleState(state: ValueState): void {  }
}
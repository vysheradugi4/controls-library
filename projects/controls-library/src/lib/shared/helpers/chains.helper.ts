import { ValueState } from '../models/value-state.model';


interface StatePreparer {
  successor: StatePreparer;
  handleNumber(value: number): ValueState;
  handleString(value: number): ValueState;
  addSuccessor(successor: StatePreparer): void;
}


class PositiveNumber implements StatePreparer {

  successor: StatePreparer;


  handleNumber(value: number): ValueState {
    throw new Error("Method not implemented.");
  }


  handleString(value: number): ValueState {
    throw new Error("Method not implemented.");
  }


  addSuccessor(successor: StatePreparer): void {
    throw new Error("Method not implemented.");
  }


}

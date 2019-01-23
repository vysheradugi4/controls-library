export class ValueState {

  private _valueString = '';
  private _valueNumber = 0;

  constructor() { }


  public set valueString(value: string) {
    this._valueString = value;
  }


  public set valueNumber(value: number) {
    this._valueNumber = value;
  }


  public get valueString() {
    return this._valueString;
  }


  public get valueNumber() {
    return this._valueNumber;
  }
}

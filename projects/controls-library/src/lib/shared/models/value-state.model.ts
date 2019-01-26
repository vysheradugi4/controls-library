export class ValueState {

  public changeCursorPosition = 0;


  /**
   * ValueString used grouping separators, such as thousands separators or
   * thousand/lakh/crore separators.
   */
  public useGrouping = false;

  private _valueString = '';
  private _valueNumber = 0;
  private _lastValueString = '';
  private _lastValueNumber = 0;

  constructor() { }


  public dirtyStringLoad(valueString: string) {
    this._valueString = valueString;
  }


  public set valueString(value: string) {
    this._valueString = value;
    this._lastValueString = value;
  }


  public set valueNumber(value: number) {
    this._valueNumber = value;
    this._lastValueNumber = value;
  }


  public get valueString() {
    return this._valueString;
  }


  public get valueNumber() {
    return this._valueNumber;
  }


  public get lastValueString() {
    return this._lastValueString;
  }


  public get lastValueNumber() {
    return this._lastValueNumber;
  }
}

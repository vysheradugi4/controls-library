export class ValueState {

  public changeCursorPosition = 0;

  /**
   * ValueString used grouping separators, such as thousands separators or
   * thousand/lakh/crore separators.
   */
  public useGrouping = false;

  /**
   * String from user's input or write value.
   */
  private _enteredString = null;

  private _valueString = '';
  private _valueNumber = null;
  private _lastValidValueString = '';
  private _lastValidValueNumber = null;

  constructor() { }


  public set enteredString(valueString: string) {
    this._enteredString = valueString;
  }


  public set valueString(value: string) {
    this._valueString = value;
    this._lastValidValueString = value;
  }


  public set valueNumber(value: number) {
    this._valueNumber = value;
    this._lastValidValueNumber = value;
  }


  public get valueString() {
    return this._valueString;
  }


  public get valueNumber() {
    return this._valueNumber;
  }


  public get lastValueString() {
    return this._lastValidValueString;
  }


  public get lastValueNumber() {
    return this._lastValidValueNumber;
  }


  public get enteredString() {
    return this._enteredString;
  }
}

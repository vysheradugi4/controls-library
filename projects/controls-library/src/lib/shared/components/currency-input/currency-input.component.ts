import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  styles: [],
})
export class CurrencyInputComponent implements OnInit {

  /**
   * Css class name for input.
   */
  @Input() public controlClass: string;

  constructor() { }

  ngOnInit() {
  }

}

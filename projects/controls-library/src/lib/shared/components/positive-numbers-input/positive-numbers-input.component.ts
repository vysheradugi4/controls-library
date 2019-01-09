import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'positive-numbers-input',
  templateUrl: './positive-numbers-input.component.html',
  styles: [],
})
export class PositiveNumbersInputComponent implements OnInit {

  /**
   * Css class name for input.
   */
  @Input() public controlClass: string;

  constructor() { }

  ngOnInit() {
  }

}

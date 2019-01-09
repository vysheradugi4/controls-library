import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'number-range-input',
  templateUrl: './number-range-input.component.html',
  styles: [],
})
export class NumberRangeInputComponent implements OnInit {

  /**
   * Css class name for input.
   */
  @Input() public controlClass: string;

  constructor() { }

  ngOnInit() {
  }

}

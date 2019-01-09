import { NgModule } from '@angular/core';
import { ControlsLibraryComponent } from './controls-library.component';
import { NumberRangeInputComponent } from './shared/components/number-range-input/number-range-input.component';
import { CurrencyInputComponent } from './shared/components/currency-input/currency-input.component';
import { PositiveNumbersInputComponent } from './shared/components/positive-numbers-input/positive-numbers-input.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
    CurrencyInputComponent,
    PositiveNumbersInputComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
    CurrencyInputComponent,
    PositiveNumbersInputComponent,
  ],
})
export class ControlsLibraryModule { }

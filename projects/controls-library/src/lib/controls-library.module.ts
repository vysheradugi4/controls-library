import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsLibraryComponent } from './controls-library.component';
import { NumberRangeInputComponent } from './shared/components/number-range-input/number-range-input.component';
import { CurrencyInputComponent } from './shared/components/currency-input/currency-input.component';
import { PositiveNumbersInputComponent } from './shared/components/positive-numbers-input/positive-numbers-input.component';
import { PositiveIntegerInputComponent } from './shared/components/positive-integer-input/positive-integer-input.component';


@NgModule({
  declarations: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
    CurrencyInputComponent,
    PositiveNumbersInputComponent,
    PositiveIntegerInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
    CurrencyInputComponent,
    PositiveNumbersInputComponent,
    PositiveIntegerInputComponent,
  ],
})
export class ControlsLibraryModule { }

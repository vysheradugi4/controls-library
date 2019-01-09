import { NgModule } from '@angular/core';
import { ControlsLibraryComponent } from './controls-library.component';
import { NumberRangeInputComponent } from './shared/components/number-range-input/number-range-input.component';

@NgModule({
  declarations: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
  ],
  imports: [
  ],
  exports: [
    ControlsLibraryComponent,
    NumberRangeInputComponent,
  ],
})
export class ControlsLibraryModule { }

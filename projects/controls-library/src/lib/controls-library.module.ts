import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlsLibraryComponent } from './controls-library.component';
import { PositiveIntegerInputComponent } from './shared/components/positive-integer-input/positive-integer-input.component';


@NgModule({
  declarations: [
    ControlsLibraryComponent,
    PositiveIntegerInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ControlsLibraryComponent,
    PositiveIntegerInputComponent,
  ],
})
export class ControlsLibraryModule { }

# Controls library – Angular 6+ form controls library.

For angular 6+ versions apps. Custom controls for input
currency, percents, positive numbers.

## Installation.

Run for installation Components Library in your project.   
   
`npm install controls-library --save`   
      
   
Add in import section in your module

`ControlsLibraryModule`   
   
   
Don't forget import this module:

`import { ControlsLibraryModule } from 'controls-library';`
   
   
## Number range input form control.

Add form tag in your template with defined form group name.

`<form [formGroup]="formGroup">`

or use single as single form control with `formControl` attribute.
   
   
Add 
   
`<number-range-input></number-range-input>`

tag for use number range input in your template form.
   
   
### Number range input form control attributes.
   
* `containerClass` – Div container css class.
   
* `inputId` – Input form field id.
   
* `controlClass` – Css class name for input.
   
* `additionalClass` – Additional css class for input.
   
* `range` – String with range in  `0..100` format (for negative numbers needs work).
Contains min and max values.
   
* `placeholder` – Input placeholder string.
   
* `prefix` – Template prefix before input form control (TemplateRef<any>).
   
* `suffix` – Template suffix after input form control (TemplateRef<any>).
   
   
   
### Example usage template part.

```
<form [formGroup]="form">
  <div>

    <ng-template #label>
      <label for="rangeInput">Positive number range input</label><br>
    </ng-template>

    <number-range-input
      containerClass="input-group"
      inputId="rangeInput"
      controlClass="range"
      formControlName="range"
      placeholder="test"
      range="0..100"
      [prefix]="label"
      [suffix]="error"
      [additionalClass]="form.get('range').hasError('required') ? 'additional-class' : ''">
    </number-range-input>

    <ng-template #error>
      <div>
        Required
      </div>
    </ng-template>

  </div>
</form>

```
   
   
   
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

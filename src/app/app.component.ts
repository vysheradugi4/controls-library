import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup;
  public currency: number;


  constructor(
    @Inject(LOCALE_ID) public locale: string
  ) { }


  ngOnInit() {
    this.form = new FormGroup({
      range: new FormControl('', [
        Validators.required
      ]),

      currency: new FormControl(),

      positiveInteger: new FormControl(),
    });

    this.form.get('range').valueChanges
      .subscribe((value) => {
        console.log('range value = ', value);
      });

    this.form.get('currency').valueChanges
      .subscribe((value) => {
        console.log('currency value = ', value);
      });

    this.form.get('positiveInteger').valueChanges
      .subscribe((value) => {
        console.log('positive integer value = ', value);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public form: FormGroup;


  constructor() { }


  ngOnInit() {
    this.form = new FormGroup({
      range: new FormControl('123')
    });

    this.form.get('range').valueChanges
      .subscribe((value) => {
        console.log('value = ', value);
      });
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsLibraryComponent } from './controls-library.component';

describe('ControlsLibraryComponent', () => {
  let component: ControlsLibraryComponent;
  let fixture: ComponentFixture<ControlsLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

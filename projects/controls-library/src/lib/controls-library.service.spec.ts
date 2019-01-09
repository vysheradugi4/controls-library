import { TestBed } from '@angular/core/testing';

import { ControlsLibraryService } from './controls-library.service';

describe('ControlsLibraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlsLibraryService = TestBed.get(ControlsLibraryService);
    expect(service).toBeTruthy();
  });
});

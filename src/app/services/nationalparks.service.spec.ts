import { TestBed } from '@angular/core/testing';

import { NationalparksService } from './nationalparks.service';

describe('NationalparksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NationalparksService = TestBed.get(NationalparksService);
    expect(service).toBeTruthy();
  });
});

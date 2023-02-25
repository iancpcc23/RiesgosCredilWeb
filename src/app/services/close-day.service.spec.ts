import { TestBed } from '@angular/core/testing';

import { CloseDayService } from './close-day.service';

describe('CloseDayService', () => {
  let service: CloseDayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseDayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

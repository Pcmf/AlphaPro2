import { TestBed } from '@angular/core/testing';

import { LastEvalCardioService } from './last-eval-cardio.service';

describe('LastEvalCardioService', () => {
  let service: LastEvalCardioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastEvalCardioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

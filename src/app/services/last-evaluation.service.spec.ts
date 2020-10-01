import { TestBed } from '@angular/core/testing';

import { LastEvaluationService } from './last-evaluation.service';

describe('LastEvaluationService', () => {
  let service: LastEvaluationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LastEvaluationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

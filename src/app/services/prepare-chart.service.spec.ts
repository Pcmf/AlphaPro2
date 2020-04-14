import { TestBed } from '@angular/core/testing';

import { PrepareChartService } from './prepare-chart.service';

describe('PrepareChartService', () => {
  let service: PrepareChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepareChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

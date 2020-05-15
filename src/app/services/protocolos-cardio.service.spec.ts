import { TestBed } from '@angular/core/testing';

import { ProtocolosCardioService } from './protocolos-cardio.service';

describe('ProtocolosCardioService', () => {
  let service: ProtocolosCardioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolosCardioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ProtcolosDobrasService } from './protcolos-dobras.service';

describe('ProtcolosDobrasService', () => {
  let service: ProtcolosDobrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtcolosDobrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

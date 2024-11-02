import { TestBed } from '@angular/core/testing';

import { EmissorService } from './emissor.service';

describe('EmissorService', () => {
  let service: EmissorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmissorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

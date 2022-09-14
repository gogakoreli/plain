import { TestBed } from '@angular/core/testing';

import { PlainService } from './plain.service';

describe('PlainService', () => {
  let service: PlainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

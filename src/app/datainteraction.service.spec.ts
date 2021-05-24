import { TestBed } from '@angular/core/testing';

import { DatainteractionService } from './datainteraction.service';

describe('DatainteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatainteractionService = TestBed.get(DatainteractionService);
    expect(service).toBeTruthy();
  });
});

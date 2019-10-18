import { TestBed, inject } from '@angular/core/testing';

import { EnumdataService } from './enumdata.service';

describe('EnumdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnumdataService]
    });
  });

  it('should be created', inject([EnumdataService], (service: EnumdataService) => {
    expect(service).toBeTruthy();
  }));
});

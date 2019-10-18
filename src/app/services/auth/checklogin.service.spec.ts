import { TestBed, inject } from '@angular/core/testing';

import { CheckloginService } from './checklogin.service';

describe('CheckloginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckloginService]
    });
  });

  it('should be created', inject([CheckloginService], (service: CheckloginService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CanActivateRouteGuardService } from './can-activate-route-guard.service';

describe('CanActivateRouteGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateRouteGuardService]
    });
  });

  it('should be created', inject([CanActivateRouteGuardService], (service: CanActivateRouteGuardService) => {
    expect(service).toBeTruthy();
  }));
});

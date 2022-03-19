import { TestBed } from '@angular/core/testing';

import { BikeShopFormService } from './bike-shop-form.service';

describe('BikeShopFormService', () => {
  let service: BikeShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikeShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

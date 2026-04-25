import { TestBed } from '@angular/core/testing';

import { RestaurantListingService } from './restaurant-listing.service';

describe('RestaurantListingService', () => {
  let service: RestaurantListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CreateRestaurantService } from './create-restaurant.service';

describe('CreateRestaurantService', () => {
  let service: CreateRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

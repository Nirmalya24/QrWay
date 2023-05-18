import { TestBed } from '@angular/core/testing';

import { EditRestaurantService } from './edit-restaurant.service';

describe('EditRestaurantService', () => {
  let service: EditRestaurantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

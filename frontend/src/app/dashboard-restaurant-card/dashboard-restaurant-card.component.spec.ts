import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRestaurantCardComponent } from './dashboard-restaurant-card.component';

describe('DashboardRestaurantCardComponent', () => {
  let component: DashboardRestaurantCardComponent;
  let fixture: ComponentFixture<DashboardRestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRestaurantCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRestaurantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

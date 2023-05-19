import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestaurantDialogComponent } from './create-restaurant-dialog.component';

describe('CreateRestaurantDialogComponent', () => {
  let component: CreateRestaurantDialogComponent;
  let fixture: ComponentFixture<CreateRestaurantDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRestaurantDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRestaurantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

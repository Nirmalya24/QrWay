import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMenusComponent } from './all-menus.component';

describe('AllMenusComponent', () => {
  let component: AllMenusComponent;
  let fixture: ComponentFixture<AllMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMenusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

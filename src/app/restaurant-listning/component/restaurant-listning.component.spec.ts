import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantListningComponent } from './restaurant-listning.component';

describe('RestaurantListningComponent', () => {
  let component: RestaurantListningComponent;
  let fixture: ComponentFixture<RestaurantListningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantListningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantListningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

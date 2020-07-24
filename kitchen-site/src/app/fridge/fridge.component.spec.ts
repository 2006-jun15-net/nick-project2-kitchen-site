import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeComponent } from './fridge.component';
import { KitchenApiService } from '../kitchen-api.service';

describe('FridgeComponent', () => {
  let component: FridgeComponent;
  let fixture: ComponentFixture<FridgeComponent>;

  beforeEach(async(() => {
    const kitchenApiService = jasmine.createSpyObj('KitchenApiService', [
      'getFridgeItems',
    ]);
    kitchenApiService.getFridgeItems.and.returnValue(Promise.resolve([]));

    // configure the testing module to use that spy obj when someone asks for
    // a KitchenApiService
    TestBed.configureTestingModule({
      declarations: [FridgeComponent],
      providers: [{ provide: KitchenApiService, useValue: kitchenApiService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// template-driven forms
// reactive forms
// auth with Okta
// HttpClient interceptor for error handling
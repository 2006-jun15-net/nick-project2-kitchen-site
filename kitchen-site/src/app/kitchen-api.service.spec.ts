
import { of } from 'rxjs';
import { KitchenApiService } from './kitchen-api.service';
import FoodItem from './models/food-item';

describe('KitchenApiService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: KitchenApiService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new KitchenApiService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected fridge items', () => {
    const expectedItems: FoodItem[] = [
      { id: 1, name: 'item', expirationDate: new Date(2020, 1, 1) },
    ];

    httpClientSpy.get.and.returnValue(of(expectedItems));

    service
      .getFridgeItems()
      .then(
        (items) => expect(items).toEqual(expectedItems, 'expected items'),
        fail
      );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FoodItem from './models/food-item';
import FoodItemCreate from './models/food-item-create';

@Injectable({
  providedIn: 'root',
})
export class KitchenApiService {
  private readonly baseUrl = 'https://localhost:44350';

  constructor(private readonly httpClient: HttpClient) {}

  getFridgeItems(): Promise<FoodItem[]> {
    return this.httpClient
      .get<FoodItem[]>(`${this.baseUrl}/api/fridge/items`)
      .toPromise();
  }

  addFridgeItem(item: FoodItemCreate): Promise<FoodItem> {
    return this.httpClient
      .post<FoodItem>(`${this.baseUrl}/api/fridge/items`, item)
      .toPromise();
  }

  cleanFridge(): Promise<void> {
    return Promise.reject(() => {
      throw new Error('Method not implemented.');
    });
  }
}

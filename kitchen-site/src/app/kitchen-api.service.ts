import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import FoodItem from './models/food-item';
import FoodItemCreate from './models/food-item-create';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KitchenApiService {
  private readonly baseUrl = environment.kitchenBaseUrl;

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

  removeFridgeItem(id: number): Promise<void> {
    return this.httpClient
      .delete(`${this.baseUrl}/api/fridge/items/${id}`)
      .toPromise()
      .then();
  }

  cleanFridge(): Promise<FoodItemCreate[]> {
    return this.httpClient
      .post<FoodItemCreate[]>(`${this.baseUrl}/api/fridge/clean`, null)
      .toPromise();
  }
}

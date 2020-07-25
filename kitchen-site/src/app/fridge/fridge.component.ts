import { Component, OnInit } from '@angular/core';
import { KitchenApiService } from '../kitchen-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import FoodItem from '../models/food-item';
import FoodItemCreate from '../models/food-item-create';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css'],
})
export class FridgeComponent {
  private openState = false;

  get open(): boolean {
    return this.openState;
  }

  set open(open: boolean) {
    if (!this.openState && open) {
      this.loadFridgeItems();
    }
    this.openState = open;
  }

  user: { admin: boolean, id: number } | null = null;
  fridgeItems: FoodItem[] | null = null;
  error: string | null = null;

  addItem = this.formBuilder.group({
    itemName: ['', Validators.required],
  });

  // this is like a C# getter-only property
  get imageUrl(): string {
    if (this.fridgeItems) {
      if (this.fridgeItems.length > 0) {
        return 'assets/fridge-open.jpg';
      } else {
        return 'assets/fridge-empty.jpg';
      }
    } else {
      return 'assets/fridge-closed.jpg';
    }
  }

  cleanFridge(): Promise<void> {
    return this.kitchenApi.cleanFridge().then(() => {
      this.loadFridgeItems();
    });
  }

  remove(item: FoodItem): never {
    throw new Error('Not implemented');
  }

  onSubmitAddItem(): void {
    const control = this.addItem.get('itemName');
    if (control) {
      const name = control.value as string;
      const item: FoodItemCreate = { name };
      this.kitchenApi.addFridgeItem(item);
    }
  }

  loadFridgeItems(): Promise<void> {
    return this.kitchenApi
      .getFridgeItems()
      .then((items) => {
        this.error = null;
        this.fridgeItems = items;
      })
      .catch((error) => (this.error = error.toString()));
  }

  constructor(
    private kitchenApi: KitchenApiService,
    private formBuilder: FormBuilder
  ) {}

  // this simplistic way of storing the state of the component in fields
  // works, but has some disadvantages compared to the observable-based reactive style
  // adopted in the documentation / tour of heroes template.
}

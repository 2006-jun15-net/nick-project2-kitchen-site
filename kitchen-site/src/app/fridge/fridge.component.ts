import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { KitchenApiService } from '../kitchen-api.service';
import FoodItem from '../models/food-item';
import FoodItemCreate from '../models/food-item-create';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
})
export class FridgeComponent {
  private openState = false;

  get open(): boolean {
    return this.openState;
  }

  set open(open: boolean) {
    if (!this.openState && open) {
      this.loadFridgeItems();
    } else if (!open) {
      this.fridgeItems = null;
    }
    this.openState = open;
  }

  user: { admin: boolean; id: number } | null = null;
  fridgeItems: FoodItem[] | null = null;
  error: string | null = null;

  addItem = this.formBuilder.group({
    itemName: ['', Validators.required],
  });

  // this is like a C# getter-only property
  get imageUrl(): string {
    if (this.open && this.fridgeItems) {
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
    return this.kitchenApi
      .cleanFridge()
      .then(() => {
        this.error = null;
        this.loadFridgeItems();
      })
      .catch(this.processHttpError);
  }

  remove(item: FoodItem): void {
    if (this.fridgeItems) {
      this.kitchenApi
        .removeFridgeItem(item.id)
        .then(() => {
          this.error = null;
          if (this.fridgeItems) {
            const index = this.fridgeItems?.indexOf(item);
            this.fridgeItems?.splice(index, 1);
          }
        })
        .catch(this.processHttpError);
    }
  }

  onSubmitAddItem(): void {
    const control = this.addItem.get('itemName');
    if (control) {
      const name = control.value as string;
      const item: FoodItemCreate = { name };
      this.kitchenApi
        .addFridgeItem(item)
        .then((item) => {
          this.error = null;
          this.fridgeItems?.push(item);
        })
        .catch(this.processHttpError);
    }
  }

  loadFridgeItems(): Promise<void> {
    return this.kitchenApi
      .getFridgeItems()
      .then((items) => {
        this.error = null;
        this.fridgeItems = items;
      })
      .catch(this.processHttpError);
  }

  processHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      this.error = 'no response from server';
    } else {
      this.error = error.statusText;
    }
  }

  constructor(
    private readonly kitchenApi: KitchenApiService,
    private readonly formBuilder: FormBuilder
  ) {}

  // this simplistic way of storing the state of the component in fields
  // works, but has some disadvantages compared to the observable-based reactive style
  // adopted in the documentation / tour of heroes template.
}

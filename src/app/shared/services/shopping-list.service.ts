import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  changeIngredients = new EventEmitter<Ingredient[]>();
  selectedIngredient = new Subject<number>();
  private ingredients: Ingredient[] = [
    {
      name: 'Apple',
      amount: 5,
    },
    {
      name: 'Banana',
      amount: 4,
    },
  ];

  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredients(ings: Ingredient) {
    this.ingredients.push(ings);
    this.changeIngredients.emit(this.ingredients.slice());
    return this.ingredients;
  }
  getIngredient(idx: number) {
    return this.ingredients[idx];
  }
  addIngfromRecipe(ings: Ingredient[]) {
    this.ingredients.push(...ings);
    this.changeIngredients.emit(this.ingredients.slice());
    return this.ingredients;
  }
  updateIngredient(idx: number, newIng: Ingredient) {
    this.ingredients[idx] = newIng;
    this.changeIngredients.emit(this.ingredients.slice());
  }
  deleteIngredient(idx: number) {
    this.ingredients.splice(idx, 1);
    this.changeIngredients.emit(this.ingredients.slice());
  }
}

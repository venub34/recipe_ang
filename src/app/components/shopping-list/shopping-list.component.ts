import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, ShoppingEditComponent],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  constructor(private ingService: ShoppingListService) {}
  ngOnInit(): void {
    this.ingredients = this.ingService.getIngredients();
    this.ingService.changeIngredients.subscribe((ing: Ingredient[]) => {
      this.ingredients = ing;
    });
  }
  onSelectIng(idx: number) {
    this.ingService.selectedIngredient.next(idx);
  }
}

import { Component, Input } from '@angular/core';
import { Recipe } from '../../../../shared/models/recipe.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe;
  @Input() index!: number;
}

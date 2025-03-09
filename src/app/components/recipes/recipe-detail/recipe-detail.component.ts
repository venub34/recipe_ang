import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from '../../../shared/services/recipe.service';
import { Recipe } from '../../../shared/models/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.id = +param['id'];
      this.recipe = this.recipeService.selectedRecipe(this.id);
    });
  }
  onToList(recipe: Recipe) {
    this.recipeService.ingtoShoppingList(recipe.ingredient);
  }
  onEdit(recipe: Recipe) {
    this.router.navigate([`edit`], { relativeTo: this.route });
  }
  onDelete() {}
}

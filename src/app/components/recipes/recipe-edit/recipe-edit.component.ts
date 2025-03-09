import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../shared/services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent implements OnInit {
  recipeForm!: FormGroup;
  id!: number;
  isEdit: boolean = false;
  recipeSelected!: Recipe;
  recipeIngredients: FormArray<FormGroup> = new FormArray<FormGroup>([
    new FormGroup({
      ingName: new FormControl(''),
      ingAmount: new FormControl(''),
    }),
  ]);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.isEdit = param['id'] != null;
      this.recipeSelected = this.recipeService.selectedRecipe(this.id);
    });
    this.initFrom();
  }

  initFrom() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.isEdit) {
      recipeName = this.recipeSelected.name;
      recipeImagePath = this.recipeSelected.imagePath;
      recipeDescription = this.recipeSelected.description;
      if (this.recipeSelected['ingredient']) {
        this.recipeSelected.ingredient.forEach((ing) => {
          // Create FormGroup with explicit typing for controls
          this.recipeIngredients.push(
            new FormGroup({
              ingName: new FormControl(ing.name),
              ingAmount: new FormControl(ing.amount),
            })
          );
        });
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImagePath),
      description: new FormControl(recipeDescription),
      ingredients: this.recipeIngredients,
    });
  }
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit() {}
  onAddIng() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        ingName: new FormControl(''),
        ingAmount: new FormControl(''),
      })
    );
  }
  onRemoveIng(i: number) {
    console.log(i);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }
}

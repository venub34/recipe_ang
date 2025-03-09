import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from '../../../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('ingForm', { static: false }) ingForm!: NgForm;
  isEditingIng: boolean = false;
  selectedIngId!: number;

  constructor(private ingService: ShoppingListService) {}
  ngOnInit(): void {
    this.initializeForm();
    this.ingService.selectedIngredient.subscribe((i) => {
      let ingredient: any;
      this.selectedIngId = i;
      this.isEditingIng = true;
      ingredient = this.ingService.getIngredient(i);
      this.ingForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount,
      });
    });
  }
  initializeForm() {}
  onSubmit(ingForm: NgForm) {
    if (this.isEditingIng) {
      this.ingService.updateIngredient(this.selectedIngId, ingForm.value);
      this.isEditingIng = false;
    } else {
      this.ingService.addIngredients(ingForm.value);
    }
    ingForm.reset();
  }
  onClear(ingForm: NgForm) {
    ingForm.reset();
    this.isEditingIng = false;
  }
  onDelte() {
    this.ingService.deleteIngredient(this.selectedIngId);
    this.ingForm.reset();
    this.isEditingIng = false;
  }
}

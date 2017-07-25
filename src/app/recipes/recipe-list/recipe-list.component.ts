import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test recipe', 'Test description ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocWipmFzjd69TUMVfw9N7FGNIfzuY4IpdONwKlZlQf5Pw1jtQig'),
    new Recipe('Otra', 'Otra description', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTocWipmFzjd69TUMVfw9N7FGNIfzuY4IpdONwKlZlQf5Pw1jtQig')
  ];

  @Output() recipeWasSelectd = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  onRecipeSelected (recipe) {
    console.log("receta en show", recipe);
    this.recipeWasSelectd.emit(recipe);
  }

}

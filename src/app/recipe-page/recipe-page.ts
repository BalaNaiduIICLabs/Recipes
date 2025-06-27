import { Component, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Apicalls } from '../services/apicalls';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './recipe-page.html',
  styleUrl: './recipe-page.css'
})
export class RecipePage {
  recipe = signal<any>(null);
  //apirecipe : any;

  constructor(private route: ActivatedRoute, private api: Apicalls) {
    const id = this.route.snapshot.paramMap.get('idCategory');
    if (id) {
      this.api.getCategoryById(id).subscribe((category: any) => {
        this.recipe.set(category);
        //this.apirecipe = category;
      });
    }
  }
}
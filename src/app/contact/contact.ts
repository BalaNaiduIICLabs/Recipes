import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Apicalls } from '../services/apicalls';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  recipe = signal<any>(null);

  constructor(private api: Apicalls) {
    this.loadRandomCategory();
    // effect(()=>{
    //   const categories = this.api.getRandomCategory();
    //   this.recipe.set(categories);
    //   console.log(categories)
    // })
  }

  async loadRandomCategory() {
    const categories = await this.api.getRandomCategory();
    this.recipe.set(categories);
  }
}
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DishService } from '../services/fav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
  templateUrl: './favorite.html',
  styleUrl: './favorite.css',
})
export class Favorite {
  //private dishService = inject(DishService);
  favoriteDishes = signal<any[]>([]);
  //LocalHost = signal<any[]>([]);

  // constructor() {
  //   effect(() => {
  //     const allDishes = this.dishService.dishes();
  //     const favs = allDishes.filter((dish) => dish.favorite);
  //     this.favoriteDishes.set(favs);
  //     console.log(localStorage.getItem('favDishes'))
  //   });
  // }

  constructor() {
    effect(() => {
      const stored = localStorage.getItem('favDishes');
      if (stored) {
          const favs = JSON.parse(stored);
          const favsOnly = favs.filter((dish:any) => dish.favorite);
          this.favoriteDishes.set(favsOnly);
      }
    });
  }
}

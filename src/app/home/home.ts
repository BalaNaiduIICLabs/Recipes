import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Apicalls } from '../services/apicalls';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DishService } from '../services/fav';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSlideToggleModule,
  ],
})
export class Home implements OnInit {
  private apiService = inject(Apicalls);
  dishList = signal<any[]>([]);
  baseList: any[] = [];
  searchControl = new FormControl('');
  fetchedDishes: any[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('favDishes');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.fetchedDishes = parsedData.map((dish: any) => ({
        ...dish,
        favorite: !!dish.favorite,
      }));
      this.dishList.set(this.fetchedDishes);
      this.baseList = [...this.fetchedDishes];
      this.dishService.setDishes(this.fetchedDishes);
    } else {
      this.initializeDishes();
    }

    this.initFilterRecipes();
  }

  deleteLocalStorage(): void {
        localStorage.removeItem('favDishes');
    this.initializeDishes();
  }

  initializeDishes(): void {
    this.fetchedDishes = this.apiService.dishList.map((dish: any) => ({
      ...dish,
      favorite: !!dish.favorite,
    }));
    this.dishList.set(this.fetchedDishes);
    this.baseList = [...this.fetchedDishes];
    this.dishService.setDishes(this.fetchedDishes);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('favDishes', JSON.stringify(this.fetchedDishes));
    }
    console.log(this.baseList[0]);
  }

  initFilterRecipes(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((value) => this.apiService.filterCategories(value, this.baseList))
      )
      .subscribe({
        next: (filteredList) => {
          const enriched = filteredList.map((dish: any) => ({
            ...dish,
            favorite: dish.favorite ?? false,
          }));
          this.dishList.set(enriched);
        },
        error: (err) => {
          console.error('Error while filtering recipes:', err);
        },
      });
  }

  onToggleFavorite(dish: any, value: boolean): void {
    dish.favorite = value;

    const updated = this.dishList().map((item) =>
      item.idCategory === dish.idCategory ? { ...item, favorite: value } : item
    );

    this.dishList.set(updated);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('favDishes', JSON.stringify(updated));
    }
  }

  trackByCategory(index: number, dish: any): string {
    return dish.idCategory;
  }
}
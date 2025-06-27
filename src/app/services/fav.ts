import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DishService {
  private localStorageKey = 'favDishes';
  private favdishes = signal<any[]>([]);
  dishes = this.favdishes.asReadonly();


  setDishes(dishes: any[]) {
    console.log('Fav dishes',dishes);
    //console.log("saving the dish")
    this.favdishes.set(dishes);
    //console.log(this.favdishes());
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(dishes));
    }
  }
}
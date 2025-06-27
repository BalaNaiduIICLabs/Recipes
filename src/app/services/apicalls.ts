import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Apicalls {
  private http = inject(HttpClient);
  public dishList: any[] = [];
  public baseList = this.dishList;

  constructor() {
    this.getCategories();
  }

  getCategories() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    this.http.get(url).subscribe({
      next: (res: any) => {
        this.dishList = res.categories;
      },
      error: () => {
        alert('Hey! Failed to fetch API.');
      },
    });
  }

  getCategories1() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    return this.http.get(url);
  }

  getCategoryById(id: string) {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    return this.http.get<any>(url).pipe(
      map(res => res.categories.find((cat: any) => cat.idCategory === id))
    );
  }

  async getRandomCategory(): Promise< any > {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    try {
      const res: any = await firstValueFrom(this.http.get(url));
      const categories = res.categories;
      const randomIndex = Math.floor(Math.random() * categories.length);
      return categories[randomIndex];
    } catch (error) {
      alert('Oops! Could not fetch categories.');
      return null;
    }
  }


  filterCategories(keyword: string | null, baseList: any[]): any[] {
    // if (!keyword) return this.dishList;
    if (!keyword) return baseList;
    console.log("lets see this should be run")
    return baseList.filter(cat =>
      cat.strCategory.toLowerCase().includes(keyword.toLowerCase())
    );
  }

}
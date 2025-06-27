import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
  ]
};

// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, catchError, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class Apicalls {
//   private http = inject(HttpClient);
//   private readonly apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

//   constructor() {}

//   getCategories() {
//     this.http.get(this.apiUrl).subscribe({
//       next: (res: any) => {
//         console.log('Fetched all categories');
//       },
//       error: () => {
//         alert('Hey! Failed to fetch API.');
//       },
//     });
//   }

//   getCategories1() {
//     return this.http.get(this.apiUrl);
//   }

//   getCategoryById(id: string) {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map(res => res.categories.find((cat: any) => cat.idCategory === id))
//     );
//   }

//   searchCategories(keyword: string | null) {
//     return this.http.get<any>(this.apiUrl).pipe(
//       map(res => {
//         const categories = res.categories || [];
//         if (!keyword) return categories;
//         return categories.filter((cat: any) =>
//           cat.strCategory.toLowerCase().includes(keyword.toLowerCase())
//         );
//       }),
//       catchError(err => {
//         console.error('Error during category search:', err);
//         return of([]);
//       })
//     );
//   }
// }




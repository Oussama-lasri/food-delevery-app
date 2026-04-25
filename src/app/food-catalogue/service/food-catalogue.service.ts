import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FoodCatalogueService {

  private apiUrl = environment.urls.API_URL_FC+'/foodCatalogue/fetchRestaurantAndFoodItemsById/'; 

   constructor(private http: HttpClient) { }

 getFoodItemsByRestaurant(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
        catchError(this.handleError)
    );
}

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'An unknown error occurred'));
  }

//   private handleError(error: any) {
//         console.error('An error occurred:', error);
//         return throwError(error.message || error);
//       }
}

import { Routes } from '@angular/router';
import { RestaurantListningComponent } from './restaurant-listning/component/restaurant-listning.component';
import { FoodCatalogueComponent } from './food-catalogue/component/food-catalogue.component';

export const routes: Routes = [
    // {path: 'restaurant', redirectTo: 'app-restaurant-listning', pathMatch: 'full' },
     { path: 'restaurant', component: RestaurantListningComponent, title: 'Restaurant Page' },
     { path: 'food-catalogue/:id', component: FoodCatalogueComponent, title: 'Food Catalogue Page' },
];

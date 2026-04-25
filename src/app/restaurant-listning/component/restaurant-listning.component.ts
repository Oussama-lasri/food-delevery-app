import { Component } from '@angular/core';
import { Restaurant } from '../../models/Restaurant';
import { Router } from '@angular/router';
import { RestaurantListingService } from '../service/restaurant-listing.service';

@Component({
  selector: 'app-restaurant-listning',
  imports: [],
  templateUrl: './restaurant-listning.component.html',
  styleUrl: './restaurant-listning.component.css'
})
export class RestaurantListningComponent {
 public restaurantList: Restaurant[] = [];
 readonly promoCategories: string[] = ['Top rated', 'Fast delivery', 'Popular now', 'Great offers'];

  ngOnInit() {
    this.getAllRestaurants();
  }

  constructor(private router: Router, private restaurantService: RestaurantListingService) { }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;
      }
    )
    
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

  onButtonClick(id: any) {
    this.router.navigate(['/food-catalogue', id]);
  }

  getEstimatedTime(index: number): string {
    const minimum = 20 + (index % 3) * 5;
    return `${minimum}-${minimum + 10} min`;
  }
}

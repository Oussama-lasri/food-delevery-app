import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FoodCatalogueService } from '../service/food-catalogue.service';
import { FoodCataloguePage } from '../../models/FoodCataloguePage';
import { FoodItem } from '../../models/FoodItem';

@Component({
  selector: 'app-food-catalogue',
  imports: [FormsModule],
  templateUrl: './food-catalogue.component.html',
  styleUrl: './food-catalogue.component.css'
})
export class FoodCatalogueComponent {

  restaurantId = 0;
  foodItemResponse: FoodCataloguePage = {};
  isCheckoutOpen = false;
  isOrderPlaced = false;
  currentDeliveryStep = 0;
  readonly deliverySteps: string[] = ['Order placed', 'Preparing', 'On the way', 'Delivered'];
  deliveryAddress = '';
  phoneNumber = '';
  paymentMethod: 'cash' | 'card' = 'cash';

  constructor(private route: ActivatedRoute, private foodService: FoodCatalogueService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +(params.get('id') || 0);
      this.getFoodItemsByRestaurant(this.restaurantId);
    });
  }

  getFoodItemsByRestaurant(restaurant: number) {
    this.foodService.getFoodItemsByRestaurant(restaurant).subscribe(
      data => {
        const menuItems = (data?.foodItemsList || []).map((item: FoodItem) => ({
          ...item,
          quantity: 0
        }));

        this.foodItemResponse = {
          ...data,
          foodItemsList: menuItems
        };

        this.resetOrderState();
      }
    )
  }

  addToOrder(foodItem: FoodItem): void {
    foodItem.quantity = (foodItem.quantity || 0) + 1;
    this.isOrderPlaced = false;
  }

  removeFromOrder(foodItem: FoodItem): void {
    const next = (foodItem.quantity || 0) - 1;
    foodItem.quantity = next < 0 ? 0 : next;
    this.isOrderPlaced = false;
  }

  getSelectedItems(): FoodItem[] {
    return (this.foodItemResponse.foodItemsList || []).filter(item => (item.quantity || 0) > 0);
  }

  getSubTotal(): number {
    const selectedItems = this.getSelectedItems();
    if (!selectedItems.length) {
      return 0;
    }

    return selectedItems.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);
  }

  getServiceFee(): number {
    return this.getSubTotal() > 0 ? 12 : 0;
  }

  getTotalItems(): number {
    const selectedItems = this.getSelectedItems();
    if (!selectedItems.length) {
      return 0;
    }

    return selectedItems.reduce((count, item) => {
      return count + (item.quantity || 0);
    }, 0);
  }

  openCheckout(): void {
    if (this.getTotalItems() === 0) {
      return;
    }

    this.isOrderPlaced = false;
    this.isCheckoutOpen = true;
  }

  placeOrder(): void {
    if (!this.canPlaceOrder()) {
      return;
    }

    this.isOrderPlaced = true;
    this.isCheckoutOpen = false;
    this.currentDeliveryStep = 0;
  }

  moveToNextDeliveryStep(): void {
    if (this.currentDeliveryStep < this.deliverySteps.length - 1) {
      this.currentDeliveryStep += 1;
    }
  }

  canPlaceOrder(): boolean {
    return (
      this.getTotalItems() > 0 &&
      this.deliveryAddress.trim().length >= 5 &&
      this.phoneNumber.trim().length >= 6
    );
  }

  private resetOrderState(): void {
    this.isCheckoutOpen = false;
    this.isOrderPlaced = false;
    this.currentDeliveryStep = 0;
    this.deliveryAddress = '';
    this.phoneNumber = '';
    this.paymentMethod = 'cash';
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnDestroy {
  cartItems: any;
  TotalAmount: number = 0;
  showEmpty: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.cartDetails();
  }
  cartDetails() {
    this.productService.getCartItems().subscribe((items: any) => {
      console.log('item', items);
      if (items.length === 0) {
        this.showEmpty = true;
      } else {
        this.cartItems = items;
        console.log("cartItems", this.cartItems);
        this.updateTotalAmount();
      }
    });
  }
  updateTotalAmount() {
    this.TotalAmount = 0;
    if (Array.isArray(this.cartItems)) {
      for (const item of this.cartItems) {
        this.TotalAmount += item.total;
      }
      
    } else {
      console.error("Data retrieved from local storage is not in array format.");
    }
  }
  deleteItem(index: any) {
    this.productService.deleteCartItem(index);
    this.cartItems = this.productService.getCartItems();
  }

  incrementCount(item: any) {
    item.count++;
    item.total = item.price * item.count; // Recalculate the total for the item
    this.updateTotalAmount(); // Update the total amount
    this.productService.updateCartItemsInLocalStorage(this.cartItems);
  }

  decrementCount(item: any) {
    if (item.count > 1) {
      item.count--;
      item.total = item.price * item.count; // Recalculate the total for the item
      this.updateTotalAmount(); // Update the total amount
      this.productService.updateCartItemsInLocalStorage(this.cartItems);
    }
  }

  storageKey: string = 'cartItems';
  deleteCartItem(id: any) {
    this.productService.deleteCartItem(id);
  }
  ngOnDestroy() {
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-model',
  templateUrl: './cart-model.component.html',
  styleUrls: ['./cart-model.component.scss']
})
export class CartModelComponent implements OnInit {
  showEmpty:boolean=false;
  cartItems:any;
  constructor(private productService:ProductService) { }

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
  TotalAmount:any;
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
}

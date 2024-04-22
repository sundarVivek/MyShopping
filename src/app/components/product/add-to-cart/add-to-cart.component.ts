import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  cartValue: number = 0;
  cartItem: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private productservice: ProductService) {
    console.log("data", this.data)
  }

  ngOnInit(): void {

  }
  count: any = 1;

  incrementCount() {
    if (this.count < 100) {
      this.count++;
    }
  }

  decrementCount() {
    if (this.count > 0) {
      this.count--;
    }
  }
  cartCount: any;
  sendDataToCart(product: any): void {
    const total = product.price * this.count;
    const productWithCountAndTotal = { ...product, count: this.count, total: total };
    this.productservice.addToCart(productWithCountAndTotal);
  }
}

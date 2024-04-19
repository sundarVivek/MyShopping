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
  TotalAmountToDisplay: any;
  showEmpty: boolean = false;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getCartItems().subscribe((items: any) => {
      console.log('item', items);
      if(items.length===0){
        this.showEmpty=true;
      }else{
        this.cartItems = items;
        console.log("cartItems",this.cartItems)
        if (Array.isArray(this.cartItems)) {
          for (const item of this.cartItems) {
            this.TotalAmount += item.total;
          }
          localStorage.setItem('Total', JSON.stringify(this.TotalAmount));
          this.TotalAmountToDisplay = localStorage.getItem('Total');
        } else {
          console.error("Data retrieved from local storage is not in array format.");
        }
      }
 
    });
    // const storedJsonString = localStorage.getItem('cartItems') as string;
    // this.cartItems = JSON.parse(storedJsonString);
  }

  deleteItem(index: any) {
    this.productService.deleteCartItem(index);
    this.cartItems = this.productService.getCartItems();
  }

  incrementCount(item: any) {
    item.count++;
    this.productService.updateCartItemsInLocalStorage(this.cartItems);

  }

  decrementCount(item: any) {
    item.count--;
    this.productService.updateCartItemsInLocalStorage(this.cartItems);
  }

  storageKey: string = 'cartItems';
  deleteCartItem(id: any) {
    this.productService.deleteCartItem(id);
  }
  ngOnDestroy() {
  }
}

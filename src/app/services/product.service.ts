import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productApi: string = 'https://dummyjson.com/products';
  products: any;
  cartCount: any;
  storageKey: string = 'cartItems';
  storageKeyForCount: string = 'cartCount'
  private cartItemsSubject: any = new BehaviorSubject<any[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  constructor(private http: HttpClient) { 
    this.updateCartCount();
    this.cartItemsSubject.next(this.getCartItemsFromLocalStorage());
  }

  getAllProducts() {
    return this.http.get(this.productApi);
  }
  addToCart(item: any) {
    const currentItems: any = this.cartItemsSubject.getValue();
    const updatedItems: any = [...currentItems, item];
    this.cartItemsSubject.next(updatedItems);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
     this.updateCartCount();
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }
  getCartItemsFromLocalStorage(): any[] {
    const cartItemsJson = localStorage.getItem(this.storageKey);
    return cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }
  updateCartItemsInLocalStorage(cartItems: any[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);
  }
  deleteCartItem(id: number): void {
    let cartItems: any[] = this.getCartItemsFromLocalStorage();
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    this.updateCartItemsInLocalStorage(updatedCartItems);
    this.updateCartCount();
  }
  getCartCount() {
    return this.cartCountSubject.asObservable();
  }
  getCartCountFromLocalStorage() {
    const cartItemsJson = localStorage.getItem(this.storageKeyForCount);
    return cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }
  updateCartCount(): void {
    const cartItems = this.getCartItemsFromLocalStorage();
    const cartCount = cartItems.length;
    localStorage.setItem(this.storageKeyForCount, JSON.stringify(cartCount));
    this.cartCountSubject.next(cartCount);
  }
  incrementcount(item:any){
    if (item.quantity > 1) {
      item.quantity++;
      this.updateCartItemsInLocalStorage(this.cartItemsSubject);
    }
  }
  decrementCount(item:any){
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItemsInLocalStorage(this.cartItemsSubject);
    }
  }
}

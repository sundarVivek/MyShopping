import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageKey: string = 'credentials';
  private credentialSubject: any = new BehaviorSubject<any[]>([]);
  constructor() { }

  storeRegistration(user: any) {
    const currentItems: any = this.credentialSubject.getValue();
    const updatedItems: any = [...currentItems, user];
    this.credentialSubject.next(updatedItems);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedItems));
  }
  getCredentialsFromLocalStorage() {
    const cartItemsJson = localStorage.getItem(this.storageKey);
    return cartItemsJson ? JSON.parse(cartItemsJson) : [];
    // return cartItemsJson ? JSON.parse(cartItemsJson) : [];
  }
  getAllUsers() {
    return this.credentialSubject.asObservable();
  }
  login(email: string, password: string): boolean {
    // let users: any[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    let users: any[] = this.getCredentialsFromLocalStorage();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }
  logout(){
    localStorage.removeItem('currentUser');
  }
  getCurrentUser(): any {
    // Get the current user from local storage
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isLoggedIn(): boolean {
    // Check if the current user is authenticated by checking local storage
    return !!localStorage.getItem('currentUser');
  }
}

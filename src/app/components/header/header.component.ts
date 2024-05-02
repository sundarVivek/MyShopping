import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { LogOutComponent } from '../auth/log-out/log-out.component';
import { CartModelComponent } from '../product/cart-model/cart-model.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  cartCount: number = 0;
  private cartCountSubscription!: Subscription;
  constructor(private route: Router,
    private productService: ProductService,
    private auth: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCartCount();
    this.showCustomer();
  }

  getCartCount() {
    this.cartCountSubscription = this.productService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }
  logout(): void {
    if (this.isLoggedIn()) {
      const dialogRef = this.dialog.open(LogOutComponent, {
        data: {
          title: 'Logout Confirmation',
          message: 'Are you sure you want to logout?'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.auth.logout();
          this.customerName='';
          this.route.navigate(['/login'])
        }
      });
    } else {
      this.route.navigate(['/login'])
    }

  }

  openCart() {
    // this.route.navigate(['/cart'])
  this.dialog.open(CartModelComponent, {
      width: '700px', // Adjust width as needed
      position: { left: '0' }, // Set position to the lef
      height:'600px',
      data:{}
    });
  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  customerName: string = '';
  showCustomer() {
    if (this.isLoggedIn()) {
      this.customerName = this.auth.getCurrentUser().username;
    }
  }

  ngOnDestroy(): void {
    this.cartCountSubscription.unsubscribe();
  }
}

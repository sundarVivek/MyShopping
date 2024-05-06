import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WarningComponent } from '../../auth/warning/warning.component';
import { AddToCartComponent } from '../add-to-cart/add-to-cart.component';


@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})

export class ViewProductComponent implements OnDestroy {
  products: any;
  private productSubscription: Subscription = new Subscription;
  
  constructor(private productService: ProductService,
    public dialog: MatDialog,
    private http: HttpClient,
    private auth: AuthService) {
    
  }

  ngOnInit(): void {
    this.productSubscription = this.productService.getAllProducts().subscribe((res: any) => {
      console.log("res", res);
      const myArray = Object.values(res.products);
      this.products = myArray;
      console.log("pro", this.products);
    }
    )
  }
  openDialog(item: any) {
    if (this.isLoggedIn()) {
      const dialogRef = this.dialog.open(AddToCartComponent, { data: item });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      this.dialog.open(WarningComponent);
    }

  }
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
  trackById(item: any): number {
    return item ? item.id : null; // Return item.id if item is not null or undefined 
  }
  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
  }
}

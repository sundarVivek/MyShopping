import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { ProductService } from './services/product.service';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  public isExpanded = false;
  loading: boolean = false;

  constructor(public spinner:SpinnerService,
    private productService:ProductService){

  }
  ngOnInit(): void {
    this.listenToLoading();
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  listenToLoading(): void {
    this.spinner.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading:any) => {
        this.loading = loading;
      });
  }
}

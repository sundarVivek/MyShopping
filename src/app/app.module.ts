import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewProductComponent } from './components/product/view-product/view-product.component';
import { AddToCartComponent } from './components/product/add-to-cart/add-to-cart.component';
import { HttpClientModule } from  '@angular/common/http';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//material
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/product/cart/cart.component';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { OrderHistoryComponent } from './components/product/order-history/order-history.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogOutComponent } from './components/auth/log-out/log-out.component';
import { WarningComponent } from './components/auth/warning/warning.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewProductComponent,
    AddToCartComponent,
    HeaderComponent,
    CartComponent,
    OrderHistoryComponent,
    RegistrationComponent,
    LoginComponent,
    LogOutComponent,
    WarningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,FormsModule,ReactiveFormsModule,
    //material
    MatCardModule,MatButtonModule,MatDialogModule,MatInputModule
    ,MatFormFieldModule,MatIconModule,MatToolbarModule,MatTableModule,
    MatBadgeModule,MatTabsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

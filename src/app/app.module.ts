import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AddProductComponent} from './product/add-product/add-product.component';
import { DeleteProductDialog, ProductsComponent } from './product/products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductsComponent,
    DeleteProductDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    Ng2SearchPipeModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

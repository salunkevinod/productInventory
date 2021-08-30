import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';


import { ProductDetailsService } from '../product-details.service';
import { Product } from '../product.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy {

  searchText:string;
  products: Product[];
  productSubscription:Subscription;
  pageSlice:any;
  error:string;

  constructor(private productDetailService:ProductDetailsService,private router:Router,public dialog: MatDialog) { }

  ngOnInit() {
    this.productDetailService.fetchProducts().subscribe((res)=>{
    },(error)=>{
      this.error = error;
    });
    this.productSubscription = this.productDetailService.productUpdate.subscribe(
      (products:Product[])=>{
          this.products = products;
          this.pageSlice = this.products.slice(0,3);
      }
    )
  }

  getUrl(url:any) {
    return "url("+url+")";
  }

  onEditProduct(index:number) {
    this.productDetailService.editedProductIndex.next(index);
    this.router.navigate(['\addProduct']);
  }

  openDialog(index:number) {
    const dialogRef = this.dialog.open(DeleteProductDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onDeleteProduct(index);
      }
    });
  }

  onDeleteProduct(index:number) {
    this.productDetailService.deleteProduct(index);
  }

  onPageChange(event: PageEvent) {
    console.log(event);
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex +  event.pageSize;
    if(endIndex > this.products.length) {
      endIndex = this.products.length;
    }

    this.pageSlice = this.products.slice(startIndex,endIndex);

  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
  }

}

@Component({
  selector: 'delete-product-dialog',
  templateUrl: './productsDelete.component.html',
})
export class DeleteProductDialog {}

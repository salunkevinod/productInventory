import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {catchError, map,tap} from 'rxjs/operators';

import { Product } from './product.model';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private products:Product[] = [];
  productUpdate = new Subject<Product[]>();
  editedProductIndex = new BehaviorSubject<any>(null);

  constructor(private http:HttpClient,private errService:ErrorService) { }

  getProducts() {
    const products:Product[] = this.products.slice()
    return products;
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addProduct(product:Product) {
    this.products.push(product);
    this.productUpdate.next(this.products.slice());
    this.storeProducts();
  }

  updateProduct(index:number,product:Product) {
    this.products[index] = product;
    this.productUpdate.next(this.products.slice());
    this.storeProducts();
  }

  deleteProduct(index:number){
    this.products.splice(index,1);
    this.storeProducts();
    this.productUpdate.next(this.products.slice());
  }

  storeProducts(){
    const products = this.getProducts();
    this.http.put('https://thinkbridge-8471c-default-rtdb.firebaseio.com/products.json',products)
    .subscribe(response=>{
    })
  }

  fetchProducts() {
    return this.http.get<Product[]>('https://thinkbridge-8471c-default-rtdb.firebaseio.com/products.json')
    .pipe(
      map(products=>{
        if(products){
          return products.map( product=>{
            return {...product}
          })
        } else {
          return [];
        }
    }),
    tap(products=>{
      if(products){
      this.setProducts(products);
      }
    }),
    catchError(this.errService.handleError)
    )
  }

  setProducts(products:Product[]) {
    this.products = products;
    this.productUpdate.next(this.products.slice());
}
}

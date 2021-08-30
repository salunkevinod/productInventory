import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProductDetailsService } from './product/product-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'productInventory';
  editMode:boolean = false;

  constructor(private productDetailService:ProductDetailsService) {
    
  }
  background: ThemePalette = 'warn';
  activeLink = 'addproduct';

  ngOnInit() {
    this.productDetailService.fetchProducts().subscribe();
        this.productDetailService.editedProductIndex.subscribe((index)=>{
          if(index !== null) {
            this.editMode = true;
          } else {
            this.editMode = false;
          }
        })
  }
}

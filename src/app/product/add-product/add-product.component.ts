import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../product-details.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit,AfterViewInit {

  productObj:Product = {
    productName:'',
    productCategory:'',
    productDescription:'',
    productQuantity:1,
    productUrl:''
  };
  constructor(private productDetailService:ProductDetailsService,private _snackBar: MatSnackBar,private router:Router) { }

  durationInSeconds = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  editMode:boolean = false;
  editProductIndex:any;

  ngOnInit(): void {
        this.productDetailService.editedProductIndex.subscribe((index)=>{
          if(index !== null) {
            this.editMode = true;
            this.editProductIndex = index;
            this.productObj = this.productDetailService.getProduct(index);
          }
        })
  }

  ngAfterViewInit() {

  }

  onSubmit(productForm:NgForm) {
    const prodObj:Product = {
      productName:this.productObj.productName,
      productCategory:this.productObj.productCategory,
      productDescription:this.productObj.productDescription,
      productQuantity:this.productObj.productQuantity,
      productUrl:this.productObj.productUrl,
    }
    if(this.editMode) {
      this.productDetailService.updateProduct(this.editProductIndex,prodObj);

    } else {
      this.productDetailService.addProduct(prodObj);
    }
    productForm.resetForm();
    this.openSnackBar();
  }

  openSnackBar() {
    let succesMessage = 'Product added successfully!';
    if(this.editMode) {
      succesMessage = 'Product updated successfully!';
    }
    this._snackBar.open(succesMessage, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    });
  }

  navigateToAddProduct() {
    this.editMode = false;
    this.editProductIndex = null;
    this.productDetailService.editedProductIndex.next(null);
    this.productObj = {
      productName:'',
      productCategory:'',
      productDescription:'',
      productQuantity:1,
      productUrl:''
    };
    this.router.navigate(['\addProduct']);
  }

}

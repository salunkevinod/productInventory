import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductsComponent } from './product/products/products.component';

const routes: Routes = [
  {path:'\addProduct',component:AddProductComponent,pathMatch: 'full'},
  {path:'\productList',component:ProductsComponent},
  { path: '', redirectTo: '\addProduct', pathMatch: 'full' },
  {path:'**',redirectTo: '\addProduct', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

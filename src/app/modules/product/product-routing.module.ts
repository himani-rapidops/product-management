import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { DataResolve } from '../../shared/data.resolve';
import { CartProductComponent } from './cart-product/cart-product.component';

/* Per module route functionality will decrease the load of app,
 It will call only one module when any path called */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'add',
    component: AddEditProductComponent
  },
  {
    path: 'list',
    component: ListProductComponent,
    data: { apiPath: `http://localhost:3000/getProducts` },
    resolve: { products: DataResolve },  // on page load we get data of this api
  },
  {
    path: 'edit/:id',
    component: AddEditProductComponent,
    data: { apiPath: `http://localhost:3000/singleProduct/:id` },
    resolve: { product: DataResolve }, // on page load we get data of this api
  },
  {
    path: 'cart/:id',
    component: CartProductComponent,
    data: { apiPath: `http://localhost:3000/cart/:id` },
    resolve: { cartProductsList: DataResolve }, // on page load we get data of this api
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

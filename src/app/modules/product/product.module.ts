import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { CartProductComponent } from './cart-product/cart-product.component';

@NgModule({
    imports: [
        HttpModule,
        ProductRoutingModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        AddEditProductComponent,
        ListProductComponent,
        CartProductComponent
    ],
    providers: [ProductService]
})
export class ProductModule { }

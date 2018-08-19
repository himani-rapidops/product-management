import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  productList: any;
  isProducts: any;
  userId: string;
  isSuccessMessage = false;
  isErrorMessage = false;
  errorMessage: any;
  successMessage: any;

  constructor(private router: Router, private http: Http, private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.productList = this.route.snapshot.data['products'];
    this.userId = JSON.parse(localStorage.getItem('user'))._id;
    this.checkProductListLength();
  }

  delete(id) {
    this.productService.deleteProductById(id).subscribe((res) => {
      this.getProductList();
    }, (e) => {

    });
  }

  addToCart(id) {
    this.productService.addToCart(id).subscribe(data => {
      if (data.success) {
        this.isSuccessMessage = true;
        this.successMessage = data.message;
        setTimeout(() => {
          this.router.navigate(['/product/list']);
        }, 5000);
      } else {
        this.isErrorMessage = true;
        this.errorMessage = data.message;
      }
    });
  }

  checkProductListLength() {
    if (this.productList.length) {
      this.isProducts = true;
    } else {
      this.isProducts = false;
    }
  }

  getProductList() {
    this.productService.getAllProducts().subscribe((res) => {
      this.productList = res;
      this.checkProductListLength();
    }, (e) => {

    });
  }

}

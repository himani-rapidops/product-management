import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html'
})
export class CartProductComponent implements OnInit {
  cartProductsList: any;
  totalAmount: any;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.data['cartProductsList']) {
      this.cartProductsList = this.route.snapshot.data['cartProductsList']['Products'];
      this.totalAmount = this.route.snapshot.data['cartProductsList']['TotalAmount'];
    }
  }

}

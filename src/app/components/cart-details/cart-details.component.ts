import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  // hàm liệt kê sản phẩm trong giỏ hàng
  // lấy cartItems từ cartItems service
  // bắt data lấy giá tiền và số lượng sản phẩm
  // tính tổng tiền và sản phẩm
  listCartDetails() {
    // get handle to cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));

    // subscribe to the the cart totalQuantity
    this.cartService.totalQuantity.subscribe((data) => (this.totalQuantity = data));

    // compute cart totalPrice and totalQuantity
    this.cartService.computeCartTotals();
  }
  // hàm tăng số lượng
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  // hàm giảm số lượng
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }
  // hàm xoá sản phẩm
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}

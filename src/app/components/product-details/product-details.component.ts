import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = new Product();

  // tiêm các service vào đây
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  // hàm khởi tạo và nó sẽ bắt đầu khi gọi tới
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  // hàm xử lý gọi ra cụ thể 1 sản phẩm
  // tạo 1 biến giữ id sản phẩm
  // gọi tới service lấy sản phẩm truyển id vào và bắt data để gán vào trang
  handleProductDetails() {
    //get id param string and convert to number
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }

  /// hàm thêm vào giỏ hàng
  // gọi service thêm giỏ hàng và lấy data từ 1 sản phảm đưa vào CartItem
  addToCart() {
    const theCartItem = new CartItem(this.product);

    this.cartService.addToCart(theCartItem);
  }
}

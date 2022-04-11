import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // link api backend
  private baseUrl = 'http://localhost:8080/api/products';

  private productCategoriesUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  // hàm xử lý lấy sản phẩm list theo trang
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProducts> {
    // build url based on category id, page and size
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;

    // trả về tất cả data lấy được từ link ở trên
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // hàm xử lý lấy danh sách sản phẩm theo id danh mục
  getProductList(theCategoryId: number): Observable<Product[]> {
    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  // hàm xử lý lấy danh mục sản phẩm
  getProductCategories(): Observable<ProductCategory[]> {
    // trả về phương thức get từ api nhúng ở interface bên dưới được lấy từ url và thực hiện chuyển đổi dữ liệu sau đó map thành array data productCategory
    return this.httpClient
      .get<GetProductCategoriesResponse>(this.productCategoriesUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, thePageSize: number, theKeyword: string): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map((response) => response._embedded.products));
  }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetProductCategoriesResponse {
  _embedded: { productCategory: ProductCategory[] };
}

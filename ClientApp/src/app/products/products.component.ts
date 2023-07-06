import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{

  products: Product[];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

}

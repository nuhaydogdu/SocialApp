import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  constructor(private productService: ProductService){}

  addProduct(name: string, price: string, isactive:boolean)
  {
    const p = new Product(0,name,Number.parseInt(price),isactive);
    this.productService.saveProduct(p);
  }
}

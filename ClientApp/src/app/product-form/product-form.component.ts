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
console.log(name);
console.log(price);
console.log(isactive);

const p = new Product(this.productService.getProducts().length+1,name,Number.parseInt(price),isactive);
this.productService.addProduct(p);
  }
}

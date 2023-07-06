import { Component } from '@angular/core';
import { Model } from '../Model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  model =new Model();

  getName(){
    return this.model.categoryName;
  }

  getProducts(){
    return this.model.products;
  }
}

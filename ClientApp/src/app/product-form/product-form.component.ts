import { Component } from '@angular/core';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  addProduct(name: string, price: string, isactive:boolean)
  {
console.log(name);
console.log(price);
console.log(isactive);
  }
}

import { Injectable } from '@angular/core';
import { Model, Product } from './Model';

@Injectable({
  providedIn: 'root'
  //service'nin kullanım alanlarının belirlenebildiği yer
  //birden fazla modül olduğunda hangi modül içerisnde kulanabilir olacağını belirleyebiliyoruz.
})
export class ProductService {
  // ProductService'yi istediğimiz component içerisine inject edebiliyoruz
  model =new Model();

  constructor() { }

  getProducts(){
    return this.model.products;
  }

  addProduct(product: Product){
    this.model.products.push(product);
  }
}

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

  getproductById(id: number){
    return this.model.products.find(i=>i.id==id);
  }

  saveProduct(product: Product) {
    if (product.id === 0) {
      product.id=this.getProducts().length+1;
      this.model.products.push(product);
    } else {
      const p = this.getproductById(product.id);
      if (p) {
        p.name = product.name;
        p.price = product.price;
        p.isActive = product.isActive;
      }
    }
  }

  deleteProduct(product: Product){
   this.model.products= this.model.products.filter(p=>p!==product);
   //tüm products listesini dolaşıyor product' e eşit olmayanları tekrar ekliyor eşit olanı çıkarıyor böyle bir filtreleme.
  }

}

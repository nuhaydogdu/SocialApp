import { Component, Input } from '@angular/core';
import { Product } from '../Model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // dışarıdan gelen Product bilgisini almak için @Input decoratörünü kullanmamız gerekiyor
  @Input() product: Product | null;

  constructor(private productService: ProductService){
    this.product = null;
  }

  addProduct(id: string, name: string, price: string, isactive:boolean)
  {
    const p = new Product(Number.parseInt(id),name,Number.parseInt(price),isactive);        //formdan getirilen bilgiler string olarak geliyor o yüzden burada onlara number dönüşümü uyguluyoruz.
    this.productService.saveProduct(p);
    this.product = null;
  }
}

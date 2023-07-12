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
  @Input() products: Product[];

  constructor(private productService: ProductService){
    this.product = null;
    this.products=[];
  }

  addProduct(id: string, name: string, price: string, isactive:boolean)
  {
    const p = new Product(Number.parseInt(id),name,Number.parseInt(price),isactive);        //formdan getirilen bilgiler string olarak geliyor o yüzden burada onlara number dönüşümü uyguluyoruz.
    this.productService
    .updateProduct(p)
    .subscribe(result=>      //products.componenet.html sayfasından göndermiş olduğumuz products listesini yukarda karşıladık vev burada liste üzerinde bir bilgiyi değiştiriyoruz.
      {
        this.products.splice(this.products.findIndex(x=>x.productId==p.productId),1,p);
      });
    this.product = null;
  }
}

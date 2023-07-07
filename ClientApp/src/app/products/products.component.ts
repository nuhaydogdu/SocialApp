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
  selectedProduct: Product | null; //buradki seçmiş olduğumuz Product bilgisini başka bir componente imput olarak göndermemiz gerekiyor.

  constructor(private productService: ProductService) {
    this.products = [];
    this.selectedProduct = null;
  }

  //constructerden hemen sonra çalışan method (constructorda servis çağırımı yapılıyor sonra bu çalıştırılıyor)
  ngOnInit():void{
    this.products = this.productService.getProducts();
  }

  onSelectedProduct(product: Product){
    this.selectedProduct= product;
  }

}

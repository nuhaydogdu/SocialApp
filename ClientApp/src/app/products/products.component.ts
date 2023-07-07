import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../Model';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{

  selectedProduct: Product | null; //buradki seçmiş olduğumuz Product bilgisini başka bir componente imput olarak göndermemiz gerekiyor.

  constructor(private productService: ProductService) {
    this.selectedProduct = null;
  }

  //constructerden hemen sonra çalışan method (constructorda servis çağırımı yapılıyor sonra bu çalıştırılıyor)
  ngOnInit():void{
  }


  getProducts():Product[]{
    return this.productService.getProducts();
  }

  onSelectedProduct(product: Product){
    this.selectedProduct= product;
  }

  deleteProduct(product: Product){
  this.productService.deleteProduct(product);
  }
}

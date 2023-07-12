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
  products: Product[];


  constructor(private productService: ProductService) {
    this.selectedProduct = null;
    this.products = [];
  }

  //constructerden hemen sonra çalışan method (constructorda servis çağırımı yapılıyor sonra bu çalıştırılıyor)
  ngOnInit():void{
    this.getProducts(); //yukarıdaki products listesinin dolmasını sağlıyor
  }


  getProducts(){
    this.productService.getProducts().subscribe(products =>
      {
        this.products=products;
      });
  }

  onSelectedProduct(product: Product){
    this.selectedProduct= product;
  }

  deleteProduct(product: Product){
  this.productService.deleteProduct(product).subscribe(p=>{
    this.products.splice(this.products.findIndex(p=>p.productId == product.productId),1)
    //buradaki index numaralı elemandan itibaren bir elamanı sil yerine bir eleman koyma(güncelleme işleminde koyması için ayrı bi rveri gönderdik)
  });
  }
}

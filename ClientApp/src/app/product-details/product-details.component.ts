import { Component, Input } from '@angular/core';
import { Product } from '../Model';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  // dışarıdan gelen Product bilgisini almak için @Input decoratörünü kullanmamız gerekiyor
  @Input() product: Product | null;

  constructor(){
    this.product = null;
  }
}

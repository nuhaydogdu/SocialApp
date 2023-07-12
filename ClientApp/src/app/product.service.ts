import { Injectable } from '@angular/core';
import { Model, Product } from './Model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  //service'nin kullanım alanlarının belirlenebildiği yer
  //birden fazla modül olduğunda hangi modül içerisnde kulanabilir olacağını belirleyebiliyoruz.
})
export class ProductService {
  // ProductService'yi istediğimiz component içerisine inject edebiliyoruz
  model =new Model();

  baseUrl: string ="http://localhost:5000/";

  constructor(private http: HttpClient) { }
  //http'yi kullanabilmek için projeye import ettik ancak inject işlemiyle bir nesne üretiyor olmamız gerekiyor



  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'api/products')
    // this.http.get(this.baseUrl+ 'api/products').subscribe();
    //(this.http.get(this.baseUrl+ 'api/products') bu strimi akışı başlatıyoruz ama bize ne zaman bir cevap geleceğini bilmiyoruz.
    //cevap geldeden bu cevabı bekleme listesine girmemiz gerekiyor subscribe() bu işe yarıyor
    //--------------------------
    //bu şekilde başlamış bir strimi ele almak için angularda rxjs(riaktifjs)kütüphanesi kullanılıyor.
    //ve rxjs kütüphanesi içerisinde absorvable listesi var.
    //return this.http.get<Product[]>(this.baseUrl + 'api/products') bu işlem sonucunda bize dönecek olan absorvable listesi üzerinden subscribe()  methodunu kolaylıkla kullanabiliyoruz.
  }

  addProduct(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl + 'api/products', product);
  }

  updateProduct(product: Product)
  {
    return this.http.put<Product>(this.baseUrl+ 'api/products/' + product.productId, product);
    //gücellemek istediğimiz ürün id blgisi ve güncellenecek olan bilgileri gönderiyoruz
  }

  deleteProduct(product: Product): Observable<Product>{ //sildiğimiz product bilgisini geriye döndüreceğiz(: Observable<Product>) ki products listesi içerisinden silelim.
    return this.http.delete<Product>(this.baseUrl + 'api/products/' + product.productId);
    // this.model.products= this.model.products.filter(p=>p!==product);
    //tüm products listesini dolaşıyor product' e eşit olmayanları tekrar ekliyor eşit olanı çıkarıyor böyle bir filtreleme.
   }


  getproductById(id: number){
    return this.model.products.find(i=>i.productId==id);
  }


  saveProduct(product: Product) {
    if (product.productId === 0) {
      this.model.products.push(product);
    } else {
      const p = this.getproductById(product.productId);
      if (p) {
        p.name = product.name;
        p.price = product.price;
        p.isActive = product.isActive;
      }
    }
  }

}

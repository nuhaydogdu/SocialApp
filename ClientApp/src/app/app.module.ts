import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,  //decleration içerisine app.module içerisinde kullandığımız componentler ekleniyor.
    ProductsComponent,
    ProductFormComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //Angular projesi içerisinde diğer modüleri kullanmak stediğimde buraya import etmek gerekiyor.
  ],
  providers: [],
  bootstrap: [AppComponent]  //tanımlanan başlangıç componenti(AppModule'yi çağırdığımız zaman AppComponent çalıştırılacak )
})
export class AppModule { }

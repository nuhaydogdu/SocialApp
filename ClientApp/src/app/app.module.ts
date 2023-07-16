import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './member-list/member-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,  //decleration içerisine app.module içerisinde kullandığımız componentler ekleniyor.
    ProductsComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    RegisterComponent,
    MemberListComponent,
    FriendListComponent,
    HomeComponent,
    MessagesComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //(Http requesti gönderebilmek için HttpClientModule'yi eklemek gerekiyor) Angular projesi içerisinde diğer modüleri kullanmak stediğimde buraya import etmek gerekiyor.
    FormsModule ,      //bizim ng modeli formlarda kullanabilmek için mutlaka ilgili componentin dahil olduğu module içerisine bunu eklemeliyiz
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]  //tanımlanan başlangıç componenti(AppModule'yi çağırdığımız zaman AppComponent çalıştırılacak )
})
export class AppModule { }

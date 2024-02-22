import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth-guard';
import { ErrorInterceptor } from './_services/error.intercaptor';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { TimeagoModule } from 'ngx-timeago';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageCreateComponent } from './messages/message-create/message-create.component';
import { MessageListComponent } from './messages/message-list/message-list.component';

export function tokenGetter() {
  //36
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, //decleration içerisine app.module içerisinde kullandığımız componentler ekleniyor.
    ProductsComponent,
    ProductFormComponent,
    ProductDetailsComponent,
    RegisterComponent,
    MemberListComponent,
    FriendListComponent,
    HomeComponent,
    NotfoundComponent,
    MemberDetailsComponent,
    PhotoGalleryComponent,
    MemberEditComponent,
    MessageCreateComponent,
    MessageListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //(Http requesti gönderebilmek için HttpClientModule'yi eklemek gerekiyor) Angular projesi içerisinde diğer modüleri kullanmak stediğimde buraya import etmek gerekiyor.
    FormsModule, //bizim ng modeli formlarda kullanabilmek için mutlaka ilgili componentin dahil olduğu module içerisine bunu eklemeliyiz
    NgbModule,
    TimeagoModule.forRoot(), //ngx-timeago kütüphanesini dahil ettikten sonra buraya bunu ekledik.(40)
    JwtModule.forRoot({
      //36
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/user'],
      },
    }),
    RouterModule.forRoot(appRoutes),
    NgbModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    MemberEditResolver, //(39)
    MemberDetailsResolver,
  ],
  bootstrap: [AppComponent], //tanımlanan başlangıç componenti(AppModule'yi çağırdığımız zaman AppComponent çalıştırılacak )
})
export class AppModule {}

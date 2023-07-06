import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  //AppComponenti uygulamammız içerisinde app-route olarak çağıracağım.
  templateUrl: './app.component.html', //app-route için kullanılıcak olan html sayfası
  styleUrls: ['./app.component.css']  //html sayfası için kullanılıcak olan css içerikleri nerde olacak
                                      //AppComponentin bileşenleri(css ve html)
})
export class AppComponent {
  title = 'SocialApp';
  CategoryName="Telefon"
  products= [
  {id:1, name:"samsung s1", price:1000, isActive:true},
  {id:2, name:"samsung s2", price:2000, isActiv:true},
  {id:3, name:"samsung s3", price:3000, isActive:false},
  {id:4, name:"samsung s4", price:4000, isActive:true}
   ];
}

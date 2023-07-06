import { Component } from '@angular/core';
import { Model } from './Model';

@Component({
  selector: 'app-root',  //AppComponenti uygulamammız içerisinde app-route olarak çağıracağım.
  templateUrl: './app.component.html', //app-route için kullanılıcak olan html sayfası
  styleUrls: ['./app.component.css']  //html sayfası için kullanılıcak olan css içerikleri nerde olacak
                                      //AppComponentin bileşenleri(css ve html)
})
export class AppComponent {
  title = 'SocialApp';

}

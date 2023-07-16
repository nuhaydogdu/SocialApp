import { Component, OnInit } from '@angular/core';
import { Model } from './Model';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',  //AppComponenti uygulamammız içerisinde app-route olarak çağıracağım.
  templateUrl: './app.component.html', //app-route için kullanılıcak olan html sayfası
  styleUrls: ['./app.component.css']  //html sayfası için kullanılıcak olan css içerikleri nerde olacak
                                      //AppComponentin bileşenleri(css ve html)
})
export class AppComponent implements OnInit{

  title = 'SocialApp';
  jwtHelper = new JwtHelperService();

constructor(private authService: AuthService) {}

  ngOnInit(): void { //herhangi bir componenet yüklenmeden önce ngOnInit methodu çalıştıtılacak (constructerden de önce çalışıyor)
    const token= localStorage.getItem("token");
    if(token){
      this.authService.decodedToken= this.jwtHelper.decodeToken(token);
    }
  }



}

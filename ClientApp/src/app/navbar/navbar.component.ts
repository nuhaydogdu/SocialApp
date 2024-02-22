import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyServices } from '../_services/alertify.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  model: any = {}; //formdan gönderilen her türlü şeyi karşılayabilmek için böyle bir değişken tanımladık (any)


  constructor(public authService: AuthService, private router: Router,private alertify: AlertifyServices) {} //burada bir inject işlemi yapıyoruz


  login(){
        //auth.service içerisinde yazmış olduğumuz sorguyu componenet içerisindinde subscribe methodu yardımıyla daha önce hazırlamış olduğumuz yapıyı çalıştırmış oluyoruz.
        this.authService.login(this.model).subscribe(next => {
            this.alertify.success("login başarılı");
            this.router.navigate(['/members'])  //yukarıda router'i injection ettikten sonra burada böyle kullanbiliyoruz yönlendirmeler için
          },error => {
            this.alertify.error(error);
          })
  }


  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    localStorage.removeItem("token");
    this.alertify.warning("logout");
    this.router.navigate(['/home'])
  }

}

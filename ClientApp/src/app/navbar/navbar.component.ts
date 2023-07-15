import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  model: any = {}; //formdan gönderilen her türlü şeyi karşılayabilmek için böyle bir değişken tanımladık (any)


  constructor(private authService: AuthService) {} //burada bir inject işlemi yapıyoruz


  login(){
    this.authService.login(this.model).subscribe(next => {
      console.log("login başarılı");
    },error => {
      console.log("login hatalı");
    }
    )}

}

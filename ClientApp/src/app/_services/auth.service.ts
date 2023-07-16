import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string ="http://localhost:5000/api/user/";

  jwthelper= new JwtHelperService();
  decodedToken: any;  //app.component içerisindeki ngOnInit methodu çalıştırıldığı zaman buradaki değişkenimizi direkt olarak set etmiş oluyoruz


  constructor(private http: HttpClient) { }

  login(model: any){
    //alttaki satırda model bize form üzerinden girilen değerler bunu servisimize gönderiyoruz
    // pipe iki işlemi birbirine bağlıyor ilk aşamayı this.http.post(this.baseUrl+'login', model)' yi çalıştırıyor gelen cevabı bekliyor ve ikinci aşamada gelen resposeyi anlaiz ediyor
    return this.http.post(this.baseUrl+'login', model).pipe(
      map((response: any) =>{
        const result = response;
        if(result){
          localStorage.setItem("token", result.token)
        }
      })
    )
  }

  register(model: any){
    return this.http.post(this.baseUrl+ 'register',model);
  }

  loggedIn(){
    const token = localStorage.getItem("token");
    // return token?true:false; //token varsa true yoksa false döndürüyor
    return !this.jwthelper.isTokenExpired(token) //tokenin süresinin dolup dolmadığını dönüyor
  }
}

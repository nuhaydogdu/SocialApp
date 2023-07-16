import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string ="http://localhost:5000/api/user/";

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

}

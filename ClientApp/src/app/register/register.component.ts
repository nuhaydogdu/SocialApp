import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

model: any = {};

constructor(private authService: AuthService) {}

register(){
  this.authService.register(this.model).subscribe(()=>{
    console.log("kullanıcı oluşturuldu");
  },error =>{
    console.log(error);
  });
}

}

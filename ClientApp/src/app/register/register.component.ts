import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyServices } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyServices,
    private route: Router
  ) {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('kullanıcı oluşturuldu');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        //kullanıcı oluşturma işlemi bittikten sonra kullanıcıyı yönlendirmek istiyoruz ve bunu içinde yukarıda route aldık
        //kullanıcı register oldukran sonra member sayfasına yönlendirmek istediğimizde kullanıcının login oluş olması gerekiyor o yüzden login methodunu kullandık ve ilgili modelimizi gönderdik
        this.authService.login(this.model).subscribe(() => {
          this.route.navigate(['/members']);
        });
      }
    );
  }
}

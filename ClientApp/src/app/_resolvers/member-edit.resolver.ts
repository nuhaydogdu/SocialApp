import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyServices } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private alertify: AlertifyServices,
    private authService: AuthService,
    private route: Router //bunu bir yönlendirme için kullanacağız
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> | Promise<User> {
    //(39)
    //buradaki decodedToken bilgisi auth.service.ts içerisinden geliyor ve bize aktif olan kullanıcının token bilgisinin dicode edilmiş halini getiriyor.
    //burade getUser bize bir absorvable user bilgisi döndürecek eğer burdan bir hata varsada bunu pipe ile birleştiriyoruz(yakalıyoruz)
    //alertfy sayesinde hatayı gördükten sonra kullanıcıyı navigate ile yönlendiriyoruz en sonda of parametresiyle geriye obsarvable döndürmüş oluyoruz
    // daha sonra digip app.module.ts içerisinde tanıtmamız gerekiyor ->provider altında import ediyoruz  ve artık module artık MemberEditResolver'i tanıyor
    //daha sonra route.ts içerisnde componet yüklenmeden önce user bilgisinin bize nereden geleceğini belirtmiş oluyoruz
    // son olarak resolverden gelen user bilgisini member-edit.component içerisinden alılıyoruz.
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error('server error');
        this.route.navigate(['/members']);
        // return of(null); // Returning null wrapped in an observable(buna hata verdi aşağıdaki şekilde çözdüm)
        return of(new User()); // Boş bir User nesnesi dönüyoruz
      })
    );
  }
}

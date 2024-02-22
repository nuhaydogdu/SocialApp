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
export class MemberDetailsResolver implements Resolve<User> {
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
    return this.userService.getUser(route.params['id']).pipe(
      //buradaki resolver işlemimizde kullnaıcımızın Id bilgisine route link üzerinden ulşatık details sayfası yüklenmeden bilgilerin getirilmesini sağlayacağız.
      //ve daha sonra bunu app.moduele içerisine dahil ettik
      //son olarak route içerisinde ekleme yaptık -resolve: { user: MemberEditResolver }

      catchError((error) => {
        this.alertify.error('server error');
        this.route.navigate(['/members']);
        return of(new User()); // Boş bir User nesnesi dönüyoruz
      })
    );
  }
}

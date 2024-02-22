import { Component } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AlertifyServices } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent {
  user!: User; //(39)

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyServices,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //(39)
    //obsarvable bir bilgi ve bize member-edit.resolver içerisinde resolver methodundan dönecek olan bilgiyi temsil ediyoruz.
    //getUser(this.authService.decodedToken.nameid)
    //component içerisinde tanımlamış olduğumuz user bilgisi içerisinde datadan gelen user bilgisini aktarıyoruz(route.ts'te
    // {
    //   path: 'members/edit',
    //   component: MemberEditComponent,
    //   resolve: { user: MemberEditResolver },
    //   canActivate: [AuthGuard],
    // }
    // içerisine tanımladığımız user bilgisini alıyoruz)

    this.route.data.subscribe((data) => {
      // this.user= data.user; bu satırda çalışmadı aşağıdakini yazdım
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        () => {
          this.alertify.success('profiliniz güncellendi.');
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }
}

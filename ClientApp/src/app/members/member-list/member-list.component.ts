import { Component } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyServices } from '../../_services/alertify.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent {
  // ! ile users değişkeni başlangıçta atanmasa da, kullanılabileceğini belirtiyoruz.
  users!: User[];
  userParams: any = {};

  constructor(
    private userService: UserService,
    private alertfyService: AlertifyServices
  ) {}

  // ngOnInit merhodu constructor çalıştıktan sonra çalışan bir method ve biz aşağıdaki bilgilerin bize gelmesini sağlamak için burada çağırıyoruz
  ngOnInit(): void {
    this.userParams.orderby = 'lastactive';
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(null, this.userParams).subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        this.alertfyService.error(err);
      }
    );
  }
}

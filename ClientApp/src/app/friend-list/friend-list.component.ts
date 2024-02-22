import { Component } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyServices } from '../_services/alertify.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css'],
})
export class FriendListComponent {
  // ! ile users değişkeni başlangıçta atanmasa da, kullanılabileceğini belirtiyoruz.
  users!: User[];
  followParams: string = 'followings';

  constructor(
    private userService: UserService,
    private alertfyService: AlertifyServices
  ) {}

  // ngOnInit merhodu constructor çalıştıktan sonra çalışan bir method ve biz aşağıdaki bilgilerin bize gelmesini sağlamak için burada çağırıyoruz
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.followParams).subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        this.alertfyService.error(err);
      }
    );
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/_models/user';
import { AlertifyServices } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { MessageCreateComponent } from 'src/app/messages/message-create/message-create.component';

@Component({
  selector: 'member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent {
  user!: User;
  followText: string = 'Follow';

  constructor(
    private userService: UserService,
    private alertify: AlertifyServices,
    private authService: AuthService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
    });
    // this.getUser();
  }

  //aşağıdaki işlemi en sonunda sildik çünkü member-details.resolver içersine yaptık bu işlemi
  // //../members/3
  // //route içerisinden 3 bilgisini almak için constructor içerisinde ekstra bir tanımlama işlemi yapıyorum(aktif olan route bilgisi içerisinden bir parametreyi almak istiyoruz -private route: ActivatedRoute)
  // //aşağıda uşlaşmak istediğimiz id bilgisinide route tanımlamaları içerisinde tanımlıyor olmamız gerekiyor(routes.ts).
  // //+this.route.snapshot.params['id']) başına eklemiş olduğumuz (+) işareti gelen değeri integer'a çevirmiş oluyor.
  // getUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']).subscribe(user => {
  //     this.user = user;
  //   },err => {
  //     this.alertify.error(err);
  //   })
  // }

  followUser(userId: number) {
    this.userService
      .followUser(this.authService.decodedToken.nameid, userId)
      .subscribe(
        (result) => {
          this.alertify.success(
            this.user.name + ' kullanıcısını takip ediyorsunuz'
          );
          this.followText = 'Followed';
        },
        (err) => {
          this.alertify.error(err);
        }
      );
  }

  openSendMessageModel() {
    const modalRef = this.modalService.open(MessageCreateComponent);
    //mesajı gönderirken, mesaj gönderilecek olan kişinin id bilgisine ihtiyacımız var.(onuda zaten member-details-componet.ts içerisinden alıp sayfaya gönderiyorduk direk olarak ulaştık)
    modalRef.componentInstance.recipientId = this.user.id;
  }
}

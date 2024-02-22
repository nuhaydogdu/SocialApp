import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyServices } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-message-create',
  templateUrl: './message-create.component.html',
  styleUrls: ['./message-create.component.css'],
})
export class MessageCreateComponent {
  @Input() recipientId!: number;
  message: any = {};

  //aktiv olan modal'a ulaşmak için bu servisini dahil ettik
  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyServices,
    private route: Router
  ) {}

  ngOnInit(): void {
    console.log(this.recipientId);
  }

  closeModal() {
    this.activeModal.close();
  }

  sendMessage() {
    this.message.recipientId = this.recipientId;

    this.userService
      .sendMessage(this.authService.decodedToken.nameid, this.message)
      .subscribe(
        (result) => {
          console.log(result);
          this.alertifyService.success('message has been sent');
          this.route.navigate(['/messages']);
        },
        (err) => {
          this.alertifyService.error(err);
        }
      );
  }
}

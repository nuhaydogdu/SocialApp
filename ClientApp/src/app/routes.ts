import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './_guards/auth-guard';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MessageListComponent } from './messages/message-list/message-list.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'members', component: MemberListComponent, canActivate: [AuthGuard] }, //burada yalnızca AuthGuard true bilgisi gönderdiğinde gidebiliyorum
  {
    path: 'members/edit',
    component: MemberEditComponent,
    resolve: { user: MemberEditResolver },
    canActivate: [AuthGuard],
  },
  {
    path: 'members/:id',
    component: MemberDetailsComponent,
    resolve: { user: MemberDetailsResolver },
    canActivate: [AuthGuard],
  },
  { path: 'friends', component: FriendListComponent, canActivate: [AuthGuard] },
  {
    path: 'messages',
    component: MessageListComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotfoundComponent },
];

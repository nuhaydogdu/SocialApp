import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl: string = 'http://localhost:5000/api/users/'; // (36)

  constructor(private http: HttpClient) {}

  getUsers(followParams?: any, userParams?: any): Observable<User[]> {
    let params = new HttpParams(); //QueryString bilgilerini bu obje aracılığı ile gönnderebiliriz

    if (followParams === 'followers') {
      params = params.append('followers', 'true');
    }

    if (followParams === 'followings') {
      params = params.append('followings', 'true');
    }

    if (userParams != null) {
      if (userParams.gender != null)
        params = params.append('gender', userParams.gender);
      if (userParams.minAge != null)
        params = params.append('minAge', userParams.minAge);
      if (userParams.maxAge != null)
        params = params.append('maxAge', userParams.maxAge);
      if (userParams.country != null)
        params = params.append('country', userParams.country);
      if (userParams.city != null)
        params = params.append('city', userParams.city);
      if (userParams.orderby != null)
        params = params.append('orderby', userParams.orderby);
    }

    return this.http.get<User[]>(this.baseurl, { params: params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseurl + id);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseurl + id, user); //user bilgisini bu şekilde body içerisinde göndermiş olduk
  }

  followUser(followerId: number, userId: number) {
    // post requeat olduğu için sonunda bodysi için boş bir {} gönderdik
    return this.http.post(this.baseurl + followerId + /follow/ + userId, {});
  }

  sendMessage(id: number, message: any) {
    return this.http.post(this.baseurl + id + '/messages/', message); //message bilgisini bu şekilde body içerisinde göndermiş olduk
  }
}

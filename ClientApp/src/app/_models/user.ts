import { image } from './image';

export class User {
  id: number;
  username: string;
  name: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date; // Burada "lastActive" özelliği tanımlandı.
  city: string;
  country: string;
  introduction: string;
  hobbies: string;
  profileImageUrl: string;
  imageUrl: string;
  images: image[];

  constructor() {
    this.id = 0;
    this.username = '';
    this.name = '';
    this.age = 0;
    this.gender = '';
    this.created = new Date();
    this.lastActive = new Date(); // "lastActive" özelliği yapıcı fonksiyonda başlatıldı.
    this.city = '';
    this.country = '';
    this.introduction = '';
    this.hobbies = '';
    this.profileImageUrl = '';
    this.imageUrl = '';
    this.images = [];
  }
}

export class image {
  id: number;
  name: string;
  description: string;
  dateAdded: Date;
  isProfile: boolean;

  constructor() {
    this.id = 0;
    this.description = "";
    this.name = "";
    this.isProfile = false;
    this.dateAdded = new Date();
  }
}


export class Model{
   products: Array<Product>;

   constructor(){
    this.products=[];
    // this.products=[
    //   new Product(1,"samsung s1",2000,true),
    //   new Product(1,"samsung s2",3000,false),
    //   new Product(1,"samsung s3",4000,true),
    //   new Product(1,"samsung s4",5000,false),
    //   new Product(1,"samsung s5",6000,true)
    // ]
   }
}
// bu dosyanın dışında module.ts dosyasındaki modeli kullanabilmek için export demek gerekiyor

export class Product{
  productId: number;
  name: string;
  price: number;
  isActive: boolean;

  // buradaki constroctor bu sınıftan bir nesne oluşturduğum zaman devreye girecek ve buradaki this (m)'i temsil ediyor
  // const m = new module();
  constructor(productId: number, name: string, price:number, isActive: boolean){
    this.productId=productId;
    this.name=name;
    this.price=price;
    this.isActive=isActive;
  }
}

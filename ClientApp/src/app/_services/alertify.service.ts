//javascript dosyasını uygulamaya import ettik ve import edilen dosya içerisinde allertify isminde bir tanımlama var ve bu tanımlamayı typeScript içerisinde kullanabilmek için (declerate)

import { Injectable } from "@angular/core";

declare let alertify:any;  //bir component içerisindede bu tanımlamayı yapıp kullanabilrdik ama heryerde tekrarlamamak için biz bir service oluşturduk


@Injectable({
  providedIn: "root"
})

export class AlertifyServices{

  constructor(){}

  success(message: string){
    alertify.success(message);
  }

  error(message: string){
    alertify.error(message);
  }

  warning(message: string){
    alertify.warning(message);
  }

  message(message: string){
    alertify.message(message);
  }

}

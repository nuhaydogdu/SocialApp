/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule) //Uygulama çalıştığı zaman AppModule çağırılacak. AppModule içerisine gidildiğindede AppComponent çağıtılacak.
  .catch(err => console.error(err));

import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {

  private readonly _TranslateService = inject(TranslateService)
  

  constructor() {

    // 1.get lang from localstorge

     let savedLang = localStorage.getItem('lang');

    // 2.setDefault lang

    this._TranslateService.setDefaultLang('en');

    // use saved lang

    this._TranslateService.use(savedLang !);

    // direction
    this.changeDirection();
   }

   changeDirection():void{
    let savedLang = localStorage.getItem('lang');
    if(savedLang === 'en'){
      document.documentElement.dir = 'ltr'
    }
    else if (savedLang === 'ar'){
      document.documentElement.dir = 'rtl' 
    }
   }


}

//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


export function createTranslateLoader(http: HttpClient) {

  //          ---------------------------------- Note ---------------------------------------
  // if your are using this version please do not paste the url below there is no need to add url here 

  return new TranslateHttpLoader(http, '', "");

}

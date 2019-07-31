import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-language',
  templateUrl: 'language.page.html',
})
export class LanguageModal {
  private languages: any;
  selectedLanguage;
  translate;
  prviousLanguageId;

  constructor(
    public viewCtrl: ViewController,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public translateService: TranslateService,
    public loading: LoadingProvider
  ) {
      this.prviousLanguageId = localStorage.langId;
    this.loading.show();
    this.httpClient.get(config.url + 'getlanguages').subscribe((data:any) => {
      this.loading.hide();
      this.translate = translateService;
      this.languages = data.languages;
      for (let data of this.languages) {
        if (data.languages_id == this.prviousLanguageId) {
          this.selectedLanguage = data;
        }
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  updateLanguage(lang) {
    console.log(lang);
    if (lang != undefined && this.prviousLanguageId != lang.languages_id) {
      this.loading.show();
      localStorage.langId=lang.languages_id;
      localStorage.direction=lang.direction;
      this.shared.emptyCart();
      this.shared.emptyRecentViewed();
      setTimeout(() => {
        window.location.reload();
      }, 900);

    }
  }
}

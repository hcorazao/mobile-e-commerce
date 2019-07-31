import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { PrivacyPolicyModal } from '../../modals/privacy-policy/privacy-policy.page';
import { TermServicesModal } from '../../modals/term-services/term-services.page';
import { RefundPolicyModal } from '../../modals/refund-policy/refund-policy.page';
import { ConfigProvider } from '../../services/config/config';
import { LoadingProvider } from '../../services/loading/loading';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';

@Component({
  selector: 'app-about-us',
  templateUrl: 'about-us.page.html',
})
export class AboutUsPage {

  constructor( private router: Router,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public config: ConfigProvider,
    public navParams: NavParams,
    public loading: LoadingProvider,
    public iab: InAppBrowser,
    ) {
  }
  showModal(value) {
    if (value == 'privacyPolicy') {
      let modal = this.modalCtrl.create(PrivacyPolicyModal);
      modal.present();
    }
    else if (value == 'termServices') {
      let modal = this.modalCtrl.create(TermServicesModal);
      modal.present();
    }
    else {
      let modal = this.modalCtrl.create(RefundPolicyModal);
      modal.present();
    }
  }
  openSite(){
    this.loading.autoHide(2000);
    this.iab.create(this.config.siteUrl,"blank");
  }
  openCart() {
    this.router.navigate(['/cart']);
}
openSearch() {
    this.router.navigate(['/search']);
}

}

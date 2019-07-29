import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { SettingsPage } from '../../pages/settings/settings';
import { ConfigProvider } from '../../services/config/config';
import {StoresPage} from "../../pages/stores/stores";
import {SearchPage} from "../../pages/search/search";
import {CartPage} from "../../pages/cart/cart";

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  segments: any = 'HomePage';
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
  ) {
    this.segments = shared.selectedFooterPage;
  }
  openPage(page) {
    this.shared.selectedFooterPage = page;

    if (page == "HomePage") { this.navCtrl.setRoot(HomePage); }
    else if (page == "CartPage") { this.navCtrl.push(CartPage); }
    else if (page == "SearchPage") { this.navCtrl.push(SearchPage); }
    else if (page == "StoresPage") { this.navCtrl.setRoot(StoresPage); }
    else if (page == "SettingsPage") { this.navCtrl.setRoot(SettingsPage); }
  }

}



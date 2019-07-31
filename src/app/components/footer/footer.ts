import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController } from 'ionic-angular';
import { HomePageModule } from '../../pages/home/home.module';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { SettingsPageModule } from '../../pages/settings/settings.module';
import { ConfigProvider } from '../../services/config/config';
import {StoresPageModule} from "../../pages/stores/stores.module";
import {SearchPageModule} from "../../pages/search/search.module";
import {CartPageModule} from "../../pages/cart/cart.module";

@Component({
  selector: 'footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {
  segments: any = 'HomePage';
  constructor(
    private router: Router,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
  ) {
    this.segments = shared.selectedFooterPage;
  }
  openPage(page) {
    this.shared.selectedFooterPage = page;

    if (page == "HomePage") { this.router.navigate(['/home']); }
    else if (page == "CartPage") { this.router.navigate(['/cart']); }
    else if (page == "SearchPage") { this.router.navigate(['/search']); }
    else if (page == "StoresPage") { this.router.navigate(['/stores']); }
    else if (page == "SettingsPage") { this.router.navigate(['/settings']); }
  }

}



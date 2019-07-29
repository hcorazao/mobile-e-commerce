import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePageModule } from '../home/home.module';
import { MyOrdersPageModule } from '../my-orders/my-orders.module';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';

@Component({
  selector: 'app-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {
  array = new Array;
  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
     public navParams: NavParams) {
    this.array = this.navCtrl.getViews();
  }
  openHome() {
    if (this.config.homePage == 1) { this.navCtrl.setRoot(HomePage); }
  }
  openOrders() { this.navCtrl.setRoot(MyOrdersPage); }

  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }

}

import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { HomePageModule } from '../home/home.module';
import { MyOrdersPageModule } from '../my-orders/my-orders.module';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';

@Component({
  selector: 'app-thank-you',
  templateUrl: 'thank-you.page.html',
})
export class ThankYouPage {
  array = new Array;
  constructor( private router: Router,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
     public navParams: NavParams) {
    this.array = this.navCtrl.getViews();
  }
  openHome() {
    if (this.config.homePage == 1) { this.router.navigate(['/home']);}
  }
  openOrders() { this.router.navigate(['/my-orders']); }

  openCart() {
    this.router.navigate(['/cart']);
  }
  openSearch() {
    this.router.navigate(['/search']);
  }

}

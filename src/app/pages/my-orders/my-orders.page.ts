import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { LoadingProvider } from '../../services/loading/loading';
import { AlertProvider } from '../../services/alert/alert';
import { OrderDetailPageModule } from '../order-detail/order-detail.module';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { HttpClient } from '@angular/common/http';
import { ProductsPageModule } from '../products/products.module';


@Component({
  selector: 'app-my-orders',
  templateUrl: 'my-orders.page.html',
})
export class MyOrdersPage {
  orders = new Array;
  httpRunning = true;
  constructor( private router: Router,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public alert: AlertProvider,
    public loading: LoadingProvider
  ) {
  }
  getOrders() {
    this.httpRunning = true;
    this.orders = [];
    this.loading.show();
    var dat: { [k: string]: any } = {};
    dat.customers_id = this.shared.customerData.customers_id;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getorders', dat).subscribe((data: any) => {
      this.loading.hide();
      this.httpRunning = false;
      if (data.success == 1) {
        this.orders = [];
        this.orders = data.data;
      }
      },
      function (response) {
        this.loading.hide();

        this.shared.toast("Server Error while Loading Orders");
        console.log(response);
      });
  };

  showOrderDetail(order) {

    this.router.navigate(['/order-detail']);

  }
  openProductsPage() {
    this.router.navigate(['/products-age']);
  }
  ionViewDidLoad() {
    this.httpRunning = true;
    this.getOrders();
  }
  openCart() {
    this.router.navigate(['/cart']);
  }
  openSearch() {
    this.router.navigate(['/search']);
  }
}

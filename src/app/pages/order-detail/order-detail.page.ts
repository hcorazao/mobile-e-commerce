import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { AlertProvider } from '../../services/alert/alert';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ProductDetailPageModule } from '../product-detail/product-detail.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-detail',
  templateUrl: 'order-detail.page.html',
})
export class OrderDetailPage {
  order: { [k: string]: any } = {};
  constructor( private router: Router,
    public navCtrl: NavController,
    public config: ConfigProvider,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public alert: AlertProvider,
    public loading: LoadingProvider) {
    this.order = this.navParams.get('data');
  }
  getSingleProductDetail(id) {
    this.loading.show();

    var dat: { [k: string]: any } = {};
    if (this.shared.customerData != null)
      dat.customers_id = this.shared.customerData.customers_id;
    else
      dat.customers_id = null;
    dat.products_id = id;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getallproducts', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.router.navigate(['/product-detail'], { data: data.product_data[0] });
      }
    });
  }
  ionViewDidLoad() {
    this.order = this.navParams.get('data');
  }

}

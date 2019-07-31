import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { AlertProvider } from '../../services/alert/alert';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ProductsPageModule } from '../products/products.module';
import { CartPageModule } from '../cart/cart.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
})
export class SearchPage {

  search;
  searchResult = [];
  showCategories = true;
  constructor( private router: Router,public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public alert: AlertProvider,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
  ) {
  }

  onChangeKeyword = function (e) {

  };
  getSearchData = function () {

    if (this.search != undefined) {
      if (this.search == null || this.search == '') {
        this.shared.toast("Please enter something ");
        return 0;
      }
    }
    else {
      this.shared.toast("Please enter something ");
      return 0;
    }
    this.loading.show();
    this.httpClient.post(this.config.url + 'getsearchdata', { 'searchValue': this.search, 'language_id': this.config.langId }).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.searchResult = data.product_data;

        this.showCategories = false;
      }
      if (data.success == 0) {
        this.shared.toast(data.message);
      }
    });
  };

  openProducts(id, name) {
    this.router.navigate(['/products'], { id: id, name: name, sortOrder: 'newest' });
  }
  openCart() {
    this.router.navigate(['/cart']);
  }
}

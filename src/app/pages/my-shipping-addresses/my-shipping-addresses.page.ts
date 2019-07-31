import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { LoadingProvider } from '../../services/loading/loading';
import { AlertProvider } from '../../services/alert/alert';
import { EditShippingAddressPageModule } from '../edit-shipping-address/edit-shipping-address.module';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-shipping-addresses',
  templateUrl: 'my-shipping-addresses.page.html',
})
export class MyShippingAddressesPage {
  allShippingAddress = new Array;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public alert: AlertProvider,
    public loading: LoadingProvider) {


  }

  getAllAddress() {
    this.loading.show();
    var dat = { customers_id: this.shared.customerData.customers_id };
    this.httpClient.post(this.config.url + 'getalladdress', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        console.log(data.data)
        this.allShippingAddress = data.data;
      }
    });
  }

  //============================================================================================  
  // delete shipping address
  deleteAddress = function (id) {
    this.loading.show();
    var dat = {
      customers_id: this.shared.customerData.customers_id,
      address_book_id: id
    };
    this.httpClient.post(this.config.url + 'deleteshippingaddress', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.getAllAddress();
      }
    }, function (response) {
      this.loading.hide();
      this.shared.toast("Error server not reponding");
    });
  };

  //============================================================================================  
  // default shipping address
  defaultAddress = function (id) {
    this.loading.show();
    var dat = {
      customers_id: this.shared.customerData.customers_id,
      address_book_id: id
    };
    this.httpClient.post(this.config.url + 'updatedefaultaddress', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.getAllAddress();
      }
    }, function (response) {
      this.loading.hide();
      this.shared.toast("Error server not reponding");
    });
  };
  openEditShippingPage(data) {
    let modal = this.modalCtrl.create(EditShippingAddressPage, { data: data, type: 'update' });
    modal.present();
    modal.onDidDismiss(() => {
      this.getAllAddress();
    });
  }
  addShippingAddress() {
    let modal = this.modalCtrl.create(EditShippingAddressPage, { type: 'add' });
    modal.onDidDismiss(() => {
      this.getAllAddress();
    });
    modal.present();
  }
  ionViewWillEnter() { this.getAllAddress(); }
  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }
}

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { SelectCountryModal } from '../../modals/select-country/select-country.page';
import { SelectZonesModal } from '../../modals/select-zones/select-zones.page';
import { BillingAddressPageModule } from '../billing-address/billing-address.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-shipping-address',
  templateUrl: 'shipping-address.page.html',
})
export class ShippingAddressPage {


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public loading: LoadingProvider, ) {

    this.loading.show();
    var dat: { [k: string]: any } = {};
    dat.customers_id = this.shared.customerData.customers_id;
    this.httpClient.post(this.config.url + 'getalladdress', dat).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        console.log("Data: ",data);
        var allShippingAddress = data.data;
        for (let value of allShippingAddress) {
          if (value.default_address != null || allShippingAddress.length == 1) {
            this.shared.orderDetails.tax_zone_id = value.zone_id;
            this.shared.orderDetails.delivery_firstname = value.firstname;
            this.shared.orderDetails.delivery_lastname = value.lastname;
            this.shared.orderDetails.delivery_state = value.state;
            this.shared.orderDetails.delivery_city = value.city;
            this.shared.orderDetails.delivery_postcode = value.postcode;
            this.shared.orderDetails.delivery_zone = value.zone_name;
            this.shared.orderDetails.delivery_country = value.country_name;
            this.shared.orderDetails.delivery_country_id = value.countries_id;
            this.shared.orderDetails.delivery_street_address = value.street;
            if (value.zone_code == null) {
              this.shared.orderDetails.delivery_zone = 'other';
              this.shared.orderDetails.delivery_state = 'other';
              this.shared.orderDetails.tax_zone_id = null;
            }
          }

        }
      }
      if (data.success == 0) { }
    });
  }
  submit() {
    this.navCtrl.push(BillingAddressPage);
  }
  selectCountryPage() {
    let modal = this.modalCtrl.create(SelectCountryModal, { page: 'shipping' });
    modal.present();
  }
  selectZonePage() {
    let modal = this.modalCtrl.create(SelectZonesModal, { page: 'shipping', id: this.shared.orderDetails.delivery_country_id });
    modal.present();
  }

}

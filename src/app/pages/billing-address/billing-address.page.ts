import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { SelectCountryModal } from '../../modals/select-country/select-country.page';
import { SelectZonesModal } from '../../modals/select-zones/select-zones.page';
import { ShippingMethodPageModule } from '../shipping-method/shipping-method.module';

@Component({
  selector: 'app-billing-address',
  templateUrl: 'billing-address.page.html',
})
export class BillingAddressPage {
  defaultAddress = true;
  constructor( private router: Router,
    public navParams: NavParams,
    public shared: SharedDataProvider,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
  ) {

    this.setAddress(true);

  }
  setAddress(value) {
    if (value == true) {
      this.shared.orderDetails.billing_firstname = this.shared.orderDetails.delivery_firstname;
      this.shared.orderDetails.billing_lastname = this.shared.orderDetails.delivery_lastname;
      this.shared.orderDetails.billing_state = this.shared.orderDetails.delivery_state;
      this.shared.orderDetails.billing_city = this.shared.orderDetails.delivery_city;
      this.shared.orderDetails.billing_postcode = this.shared.orderDetails.delivery_postcode;
      this.shared.orderDetails.billing_zone = this.shared.orderDetails.delivery_zone;
      this.shared.orderDetails.billing_country = this.shared.orderDetails.delivery_country;
      this.shared.orderDetails.billing_country_id = this.shared.orderDetails.delivery_country_id;
      this.shared.orderDetails.billing_street_address = this.shared.orderDetails.delivery_street_address;
    }
    else {
      this.shared.orderDetails.billing_firstname = '';
      this.shared.orderDetails.billing_lastname = '';
      this.shared.orderDetails.billing_state = '';
      this.shared.orderDetails.billing_city = '';
      this.shared.orderDetails.billing_postcode = '';
      this.shared.orderDetails.billing_zone = '';
      this.shared.orderDetails.billing_country = '';
      this.shared.orderDetails.billing_country_id = '';
      this.shared.orderDetails.billing_street_address = '';
    }
  }
  submit() {
   this.router.navigate(['/shipping-method']);
  }
  selectCountryPage() {
    let modal = this.modalCtrl.create(SelectCountryModal, { page: 'billing' });
    modal.present();
  }
  selectZonePage() {
    let modal = this.modalCtrl.create(SelectZonesModal, { page: 'billing', id: this.shared.orderDetails.billing_country_id });
    modal.present();
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { LanguageModal } from '../../modals/language/language.page';
import { ConfigProvider } from '../../services/config/config';
import { Storage } from '@ionic/storage';
import { PrivacyPolicyModal } from '../../modals/privacy-policy/privacy-policy.page';
import { TermServicesModal } from '../../modals/term-services/term-services.page';
import { RefundPolicyModal } from '../../modals/refund-policy/refund-policy.page';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { LoginModal} from '../../modals/login/login.page';
import { MyAccountPageModule } from '../my-account/my-account.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { HttpClient } from '@angular/common/http';
import {WishListPageModule} from "../wish-list/wish-list.module";
import {ContactUsPageModule} from "../contact-us/contact-us.module";
import {AboutUsPageModule} from "../about-us/about-us.module";
import {MyOrdersPageModule} from "../my-orders/my-orders.module";
import {MyShippingAddressesPageModule} from "../my-shipping-addresses/my-shipping-addresses.module";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
})

export class SettingsPage {
  setting: { [k: string]: any } = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public config: ConfigProvider,
    private storage: Storage,
    public loading: LoadingProvider,
    public httpClient: HttpClient,
    private localNotifications: LocalNotifications,
    public events: Events,
    public shared: SharedDataProvider,
    public iab: InAppBrowser,
    public plt: Platform,
  ) {

  }


  turnOnOffNotification(value) {
    if (this.setting.localNotification == false) {
      this.localNotifications.cancel(1).then((result) => {
      });
    }
    else {
      this.localNotifications.schedule({
        id: 1,
        title: this.config.notifTitle,
        text: this.config.notifText,
        every: this.config.notifDuration,
      });
    }

    this.updateSetting();
  }

  updateSetting() {
    console.log(this.setting);
    this.storage.set('setting', this.setting);
  }

  openLoginPage() {
    let modal = this.modalCtrl.create(LoginModal);
    modal.present();
  }

  logOut() {
    this.shared.logOut();
  }

  openPage(page) {
    if (page == 'myAccount') this.navCtrl.push(MyAccountPage);
    else if(page == 'myWishList') this.navCtrl.push(WishListPage);
    else if (page == 'contactUs') this.navCtrl.push(ContactUsPage);
    else if (page == 'aboutUs') this.navCtrl.push(AboutUsPage);
    else if (page == 'myOrders') this.navCtrl.push(MyOrdersPage);
    else if (page == 'myShippingAddresses') this.navCtrl.push(MyShippingAddressesPage);

  }

  //============================================================================================
  //turning on off local  notification
  onOffPushNotification() {
    this.storage.get('registrationId').then((registrationId) => {
      var dat: { [k: string]: any } = {};
      dat.device_id = registrationId;
      if (this.setting.notification == false) dat.is_notify = 0;
      else dat.is_notify = 1;
      this.httpClient.post(this.config.url + 'notify_me', dat).subscribe((data:any) => {
        if (data.success == 1) {

          this.updateSetting();
        }
      }, function (response) {
        console.log(response);
      });
    });
  };
  hideShowFooterMenu() {
    this.events.publish('setting', this.setting);
    this.updateSetting();
  }
  hideShowCartButton() {
    this.events.publish('setting', this.setting);
    this.updateSetting();
  }
  showModal(value) {
    this.loading.autoHide(1000);
    if (value == 'privacyPolicy') {
      let modal = this.modalCtrl.create(PrivacyPolicyModal);
      modal.present();
    }
    else if (value == 'termServices') {
      let modal = this.modalCtrl.create(TermServicesModal);
      modal.present();
    }
    else if (value == 'language') {
      let modal = this.modalCtrl.create(LanguageModal);
      modal.present();
    }
    else {
      let modal = this.modalCtrl.create(RefundPolicyModal);
      modal.present();
    }
  }
  ionViewDidLoad() {
    this.storage.get('setting').then((val) => {
      if (val != null || val != undefined) {
        this.setting = val;

      }
      else {
        this.setting.localNotification = true;
        this.setting.notification = true;
        this.setting.cartButton = true;
        this.setting.footer = true;
      }
    });
  }

  openCart() {
    this.navCtrl.push(CartPage);
  }
  openSearch() {
    this.navCtrl.push(SearchPage);
  }


}

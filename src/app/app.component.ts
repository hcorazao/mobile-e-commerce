
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TranslateService } from '@ngx-translate/core';

import { AlertProvider } from './services/alert/alert';
import { LoadingProvider } from './services/loading/loading';
import { trigger, transition, animate, style } from '@angular/animations';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network/ngx';

import { ConfigProvider } from './services/config/config';
import { SharedDataProvider } from './services/shared-data/shared-data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public counter = 0;
  @ViewChild(Nav) nav: Nav;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    public shared: SharedDataProvider,
    public alert: AlertProvider,
    public network: Network,
    public config: ConfigProvider,
    public plt: Platform,
  ) {
    this.platform.ready().then(() => {

      //this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByName("black");

      this.doubleTapToExit();
    });
    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      translate.get(["Please Connect to the Internet", "Disconnected"]).subscribe((res) => {
        this.alert.showWithTitle(res["Please Connect to the Internet"], res["Disconnected"]);
      });
      //  console.log('network was disconnected :-(');

    });

    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        //this.loading.show();
        //console.log('network connected!');
        translate.get(["Network connected Reloading Data", "Connected"]).subscribe((res) => {
          this.alert.showWithTitle(res["Network connected Reloading Data"] + '...', res["Connected"]);
        });

      }
      //connectSubscription.unsubscribe();
    });
    this.platform.setDir(localStorage.direction, true);
    shared.dir = localStorage.direction;
    //setting default languge on start up 
    translate.setDefaultLang(this.config.url + "applabels3?lang=" + this.config.langId);
    //if(this.config.siteSetting()){
    this.initializeApp();
    //}
    // events.subscribe('showAd', () => {
    //   this.showInterstitial();
    // });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  doubleTapToExit() {
    this.platform.registerBackButtonAction(() => {
      if (this.shared.currentOpenedModel != null) {
        this.shared.currentOpenedModel.dismiss();
        this.shared.currentOpenedModel = null;
      }
      else {
        let navig = this.nav;
        if (navig.canGoBack()) {
          navig.pop();
        }
        else {
          if (this.counter == 0) {
            this.counter++;
            this.shared.toast("Press Back to Exit");
            setTimeout(() => { this.counter = 0 }, 2500)
          } else {
            this.platform.exitApp();
          }
        }
      }
    }, 0)

  }
}

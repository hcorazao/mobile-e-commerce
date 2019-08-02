
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Component, ViewChild } from '@angular/core';
import { Platform, ModalController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public counter = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
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
    });
    let connectedToInternet = true;
    network.onDisconnect().subscribe(() => {
      connectedToInternet = false;
      //  console.log('network was disconnected :-(');

    });

    network.onConnect().subscribe(() => {
      if (!connectedToInternet) {
        window.location.reload();
        //this.loading.show();
        //console.log('network connected!');

      }
      //connectSubscription.unsubscribe();
    });
    shared.dir = localStorage.direction;
    //setting default languge on start up
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

}

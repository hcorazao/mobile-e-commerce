import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Device } from '@ionic-native/device/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { Push } from '@ionic-native/push/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    OneSignal,
    AppVersion,
    FCM,
    Device,
    Push,
    LocalNotifications,
    InAppBrowser,
    SocialSharing,
    Camera,
    Toast,
    GooglePlus,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

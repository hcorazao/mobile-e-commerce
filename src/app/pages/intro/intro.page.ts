import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePageModule } from '../home/home.module';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
})
export class IntroPage {
  public slides = [
    { image: "assets/intro/1.gif", title: "Home Page", icon: "home", description: "" },
    { image: "assets/intro/2.gif", title: "Category Page", icon: "cart", description: "" },
    { image: "assets/intro/3.gif", title: "Shop Page", icon: "share", description: "" },
    { image: "assets/intro/4.gif", title: "Cart Page", icon: "md-list-box", description: "" },
    { image: "assets/intro/5.gif", title: "Order Page", icon: "md-list-box", description: "" }
  ];

  constructor(
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,) {
    this.slides
  }
  openHomePage() {
    this.navCtrl.setRoot(HomePage);
  }
}

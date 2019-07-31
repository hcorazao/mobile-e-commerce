import { Component, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import { ConfigProvider } from '../../services/config/config';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsPageModule } from '../products/products.module';
import { NavController, Content } from 'ionic-angular';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';


@Component({
  selector: 'app-home',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('700ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'home.page.html',
})

export class HomePage {

  @ViewChild(Content) content: Content;

  scrollToTop() {
    this.content.scrollToTop(700);
    this.scrollTopButton = false;
  }

  onScroll(e) {

    if (e.scrollTop >= 1200) this.scrollTopButton = true;
    if (e.scrollTop < 1200) this.scrollTopButton = false;

  }
  scrollTopButton = false;
  segments: any = 'topSeller';
  search;
  searchResult = [];
  constructor(
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    ) {
  }

  openProducts(value) {
    this.navCtrl.push(ProductsPage, { sortOrder: value });
  }
  ngAfterContentChecked() {
    this.content.resize();
  }

  openCart() {
      this.navCtrl.push(CartPage);
  }
  openSearch() {
      this.navCtrl.push(SearchPage);
  }
}

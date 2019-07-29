import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {animate, style, transition, trigger} from "@angular/animations";
import {SharedDataProvider} from "../../services/shared-data/shared-data";
import {ConfigProvider} from "../../services/config/config";
import {CartPageModule} from "../cart/cart.module";
import {SearchPageModule} from "../search/search.module";
import {ShopPageModule} from "../shop/shop.module";

@Component({
  selector: 'app-stores',
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
  templateUrl: 'stores.html',
})
export class StoresPage {

  constructor(public navCtrl: NavController,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
  }

    openCart() {
        this.navCtrl.push(CartPage);
    }
    openSearch() {
        this.navCtrl.push(SearchPage);
    }

    showManufacturerStore(c){
      this.navCtrl.push(ShopPage, { data: c})
    }
}

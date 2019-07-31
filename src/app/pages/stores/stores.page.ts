import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
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
  templateUrl: 'stores.page.html',
})
export class StoresPage {

  constructor( private router: Router,public navCtrl: NavController,
              public shared: SharedDataProvider,
              public config: ConfigProvider) {
  }

    openCart() {
        this.router.navigate(['/cart']);
    }
    openSearch() {
        this.router.navigate(['/search']);
    }

    showManufacturerStore(c){
      this.router.navigate(['/shop']);
    }
}

import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { ProductsPageModule } from '../products/products.module';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';

@Component({
  selector: 'app-sub-categories',
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
  templateUrl: 'sub-categories.page.html',
})
export class SubCategoriesPage {
  subcategories=[];
  parent;
  constructor( private router: Router,
    public navCtrl: NavController,
    public navParams: NavParams,
    public shared: SharedDataProvider,
    public config: ConfigProvider) {
    this.parent = navParams.get("parent");

    for (let value of this.shared.subCategories) {  
      if (value.parent_id == this.parent) {this.subcategories.push(value);}
    }

  }
  
  openProducts(id, name) {
    this.router.navigate(['/products']);
  }
  openCart() {
    this.router.navigate(['/cart']);
}
openSearch() {
    this.router.navigate(['/search']);
}
}

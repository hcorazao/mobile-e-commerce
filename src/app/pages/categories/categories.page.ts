
import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { SubCategoriesPageModule } from '../sub-categories/sub-categories.module';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule} from '../search/search.module';


@Component({
  selector: 'app-categories',
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
  templateUrl: 'categories.page.html',
})
export class CategoriesPage {

  constructor( private router: Router,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider
  ) {

  }
  openSubCategories(parent) {
    this.router.navigate(['/sub-categories']);
  }
  openCart() {
    this.router.navigate(['/cart']);
  }
  openSearch() {
    this.router.navigate(['/search']);
  }
}

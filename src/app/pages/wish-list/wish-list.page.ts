import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { trigger, transition, animate, style } from '@angular/animations';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { HttpClient } from '@angular/common/http';
import {LoadingProvider} from "../../services/loading/loading";

@Component({
  selector: 'app-wish-list',
  animations: [
    trigger(
      'animate', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('1000ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          style({ opacity: 1 }),
          animate('500ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'wish-list.page.html',
})
export class WishListPage {
  @ViewChild(InfiniteScroll) infinite: InfiniteScroll;

  page = 0;
  constructor( private router: Router,
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider
    ) {

  }
  getProducts() {
    this.loading.show();
    var dat: { [k: string]: any } = {};
    if (this.shared.customerData.customers_id != null)
      dat.customers_id = this.shared.customerData.customers_id;
    dat.page_number = 0;
    dat.page_number = this.page;
    dat.type = 'wishlist';
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getallproducts', dat).subscribe((data:any) => {
      if (data.success == 1) {
        this.loading.hide();
        this.page++;
        var prod = data.product_data;
        for (let value of prod) {
          this.shared.wishList.push(value);
        }
      }
      if (data.success == 0) { this.infinite.enable(false); }
    });
  }
  ngOnInit() {
    this.getProducts();
  }
  openCart() {
    this.router.navigate(['/cart']);
  }
  openSearch() {
    this.router.navigate(['/search']);
  }
}

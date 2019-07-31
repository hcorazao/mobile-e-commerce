import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, Events, ModalController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { Toast } from '@ionic-native/toast/ngx';
import { ProductDetailPageModule } from '../product-detail/product-detail.module';
import { LoadingProvider } from '../../services/loading/loading';
import { Storage } from '@ionic/storage';
import { LoginModal} from '../../modals/login/login.page';
import { ShippingAddressPageModule } from '../shipping-address/shipping-address.module';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsPageModule } from '../products/products.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
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
  templateUrl: 'cart.page.html',
})
export class CartPage {
  total: any;

  constructor( private router: Router,
    public navCtrl: NavController,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public loading: LoadingProvider,
    public toast: Toast,
    public storage: Storage,
    public events: Events,
    public modalCtrl: ModalController,
  ) {
    console.log(shared.cartProducts);
  }
  totalPrice() {
    var price = 0;
    for (let value of this.shared.cartProducts) {
      var pp = value.final_price * value.customers_basket_quantity;
      price = price + pp;
    }
    this.total = price;
  };
  getSingleProductDetail(id) {
    this.loading.show();

    var dat: { [k: string]: any } = {};
    if (this.shared.customerData != null)
      dat.customers_id = this.shared.customerData.customers_id;
    else
      dat.customers_id = null;
    dat.products_id = id;
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getallproducts', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        // this.router.navigate(['/product-detail'], { data: data.product_data[0] });
        this.router.navigate(['/product-detail']); // TODO add product data
      }
    });
  }
  removeCart(id) {
    this.shared.removeCart(id);
    this.totalPrice();
  }
  qunatityPlus = function (q) {
    this.toast.show(`Product Quantity is Limited!`, 'short', 'center');
    q.customers_basket_quantity++;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    if (q.customers_basket_quantity > q.quantity) {
      q.customers_basket_quantity--;
      this.toast.show(`Product Quantity is Limited!`, 'short', 'center');
    }
    this.totalPrice();
    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }
  //function decreasing the quantity
  qunatityMinus = function (q) {
    if (q.customers_basket_quantity == 1) {
      return 0;
    }
    q.customers_basket_quantity--;
    q.subtotal = q.final_price * q.customers_basket_quantity;
    q.total = q.subtotal;
    this.totalPrice();

    this.shared.cartTotalItems();
    this.storage.set('cartProducts', this.shared.cartProducts);
  }
  ionViewDidLoad() {
    this.totalPrice()
  }
  proceedToCheckOut() {

    if (this.shared.customerData.customers_id == null || this.shared.customerData.customers_id == undefined) {
      let modal = this.modalCtrl.create(LoginModal);
      modal.present();
    }
    else {
      this.router.navigate(['/shipping-address']);
    }
  }
  openProductsPage() {
    this.router.navigate(['/products-age']);
  }


}

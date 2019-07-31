import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Content } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { TranslateService } from '@ngx-translate/core';
import { LoadingProvider } from '../../services/loading/loading';
import { AlertProvider } from '../../services/alert/alert';
import { ThankYouPageModule } from '../thank-you/thank-you.module';
import { CouponProvider } from '../../services/coupon/coupon';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-order',
  templateUrl: 'order.page.html',
})
export class OrderPage {

  @ViewChild(Content) content: Content;

  amount;
  instamojoClient;

  c;
  orderDetail: { [k: string]: any } = {};//include shipping address, billing address,  shipping methods.
  products = [];
  couponArray = [];
  couponApplied = 0;
  tokenFromServer = null;
  discount = 0;
  productsTotal = 0;
  totalAmountWithDisocunt = 0;
  nonce = '';
  stripeCard = {
    number: '',
    expMonth: 1,
    expYear: 2020,
    cvc: ''
  };

  paymentMethods = [];
  paypalClientId = "";
  paypalEnviroment = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public loading: LoadingProvider,
    public alert: AlertProvider,
    public couponProvider: CouponProvider,
    public translate: TranslateService,
    public actionSheetCtrl: ActionSheetController,
    public http: HTTP) {
  }

  //============================================================================================  
  //placing order
  addOrder = function (nonce) {
    this.loading.autoHide(5000);
    this.orderDetail.customers_id = this.shared.customerData.customers_id;
    this.orderDetail.customers_name = this.shared.orderDetails.delivery_firstname + " " + this.shared.orderDetails.delivery_lastname;
    this.orderDetail.delivery_name = this.shared.orderDetails.billing_firstname + " " + this.shared.orderDetails.billing_lastname;
    this.orderDetail.email = this.shared.customerData.email;
    this.orderDetail.customers_telephone = this.shared.customerData.customers_telephone;
    this.orderDetail.delivery_suburb = this.shared.orderDetails.delivery_state
    this.orderDetail.customers_suburb = this.shared.orderDetails.customers_state;
    this.orderDetail.customers_address_format_id = '1';
    this.orderDetail.delivery_address_format_id = '1';
    this.orderDetail.products = this.products;
    this.orderDetail.is_coupon_applied = this.couponApplied;
    this.orderDetail.coupons = this.couponArray;
    this.orderDetail.coupon_amount = this.discount;
    this.orderDetail.totalPrice = this.totalAmountWithDisocunt;
    this.orderDetail.nonce = nonce;
    this.orderDetail.language_id = this.config.langId;
    var dat = this.orderDetail;
    this.httpClient.post(this.config.url + 'addtoorder', dat).subscribe((data: any) => {
      //this.loading.hide();
      if (data.success == 1) {
        this.shared.emptyCart();
        this.products = [];
        this.orderDetail = {};
        this.shared.orderDetails = {};
        this.navCtrl.setRoot(ThankYouPage);
      }
      if (data.success == 0) { this.alert.show(data.message); }
    }, err => {

      this.translate.get("Server Error").subscribe((res) => {
        this.alert.show(res + " " + err.status);
      });

    });
  };
  initializePaymentMethods() {
    // this.loading.show();
    var dat: { [k: string]: any } = {};
    dat.language_id = this.config.langId;
    this.httpClient.post(this.config.url + 'getpaymentmethods', dat).subscribe((data: any) => {
      //  this.loading.hide();
      if (data.success == 1) {
        this.paymentMethods = data.data;
        for (let a of data.data) {

          if (a.method == "paypal" && a.active == '1') {
            this.paypalClientId = a.public_key;
            if (a.environment == "Test") this.paypalEnviroment = "PayPalEnvironmentSandbox";
            else this.paypalEnviroment = "PayPalEnvironmentProduction"

          }
        }
      }
    },
      err => {
        this.translate.get("getPaymentMethods Server Error").subscribe((res) => {
          this.alert.show(res + " " + err.status);
        });
      });
  }


  //============================================================================================  
  //CAlculate Discount total
  calculateDiscount = function () {
    var subTotal = 0;
    var total = 0;
    for (let value of this.products) {
      subTotal += parseFloat(value.subtotal);
      total += value.total;
    }
    this.productsTotal = subTotal;
    this.discount = (subTotal - total);
  };

  //============================================================================================  
  //CAlculate all total
  calculateTotal = function () {
    let a = 0;
    for (let value of this.products) {
      // console.log(value);
      var subtotal = parseFloat(value.total);
      a = a + subtotal;
    }

    let b = parseFloat(this.orderDetail.total_tax.toString());
    let c = parseFloat(this.orderDetail.shipping_cost.toString());
    this.totalAmountWithDisocunt = parseFloat((parseFloat(a.toString()) + b + c).toString());
    this.calculateDiscount();
  };

  //============================================================================================  
  //delete Coupon
  deleteCoupon = function (code) {

    this.couponArray.forEach((value, index) => {
      if (value.code == code) { this.couponArray.splice(index, 1); return true; }
    });


    this.products = (JSON.parse(JSON.stringify(this.shared.cartProducts)));
    this.orderDetail.shipping_cost = this.shared.orderDetails.shipping_cost;

    this.couponArray.forEach((value) => {
      //checking for free shipping
      if (value.free_shipping == true) {
        this.orderDetail.shippingName = 'free shipping';
        this.orderDetail.shippingCost = 0;
      }
      this.products = this.couponProvider.apply(value, this.products);
    });
    this.calculateTotal();
    if (this.couponArray.length == 0) {
      this.couponApplied = 0;
    }
  };
  //========================================================================================

  //============================================================================================   
  //getting getMostLikedProducts from the server
  getCoupon = function (code) {
    if (code == '' || code == null) {
      this.alert.show('Please enter coupon code!');
      return 0;
    }
    this.loading.show();
    var dat = { 'code': code };
    this.httpClient.post(this.config.url + 'getcoupon', dat).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        let coupon = data.data[0]
        // console.log($scope.coupon)
        this.applyCouponCart(coupon);
      }
      if (data.success == 0) {
        this.alert.show(data.message);
      }
    }, error => {
      this.loading.hide();
      console.log(error);
    });

  };

  //============================================================================================  
  //applying coupon on the cart
  applyCouponCart = function (coupon) {
    //checking the coupon is valid or not

    if (this.couponProvider.validateCouponService(coupon, this.products, this.couponArray) == false) {
      return 0;
    } else {
      if (coupon.individual_use == 1) {
        this.products = (JSON.parse(JSON.stringify(this.shared.cartProducts)));
        this.couponArray = [];
        this.orderDetail.shipping_cost = this.shared.orderDetails.shipping_cost;
        console.log('individual_use');
      }
      var v: { [k: string]: any } = {};
      v.code = coupon.code;
      v.amount = coupon.amount;
      v.product_ids = coupon.product_ids;
      v.exclude_product_ids = coupon.exclude_product_ids;
      v.product_categories = coupon.product_categories;
      v.excluded_product_categories = coupon.excluded_product_categories;
      v.discount = coupon.amount;
      v.individual_use = coupon.individual_use;
      v.free_shipping = coupon.free_shipping;
      v.discount_type = coupon.discount_type;
      this.couponArray.push(v);
    }

    //checking for free shipping
    if (coupon.free_shipping == 1) {
      // $scope.orderDetail.shippingName = 'free shipping';
      this.orderDetail.shipping_cost = 0;
      //  console.log('free_shipping');
    }
    //applying coupon service
    this.products = this.couponProvider.apply(coupon, this.products);
    if (this.couponArray.length != 0) {
      this.couponApplied = 1;
    }
    this.calculateTotal();
  };



  couponslist() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Coupons List',
      buttons: [
        {
          icon: 'arrow-round-forward',
          text: 'Cart Percentage (cp9989). A percentage discount for selected products only',
          handler: () => {
            this.c = 'cp9989';
          }
        }, {
          icon: 'arrow-round-forward',
          text: 'Product Fixed (pf8787). A fixed total discount for selected products only',
          handler: () => {
            this.c = 'pf8787';
          }
        },
        {
          icon: 'arrow-round-forward',
          text: 'Cart Fixed (cf9999). A fixed total discount for the entire cart',
          handler: () => {
            this.c = 'cf9999';
          }
        },
        {
          icon: 'arrow-round-forward',
          text: 'Product Percentage (pp2233). A percentage discount for selected products only',
          handler: () => {
            this.c = 'pp2233';
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }


  scrollToBottom() {

    setTimeout(() => {
      this.content.scrollToBottom();
      console.log("botton");
    }, 300);

  }


  ngOnInit() {
    this.orderDetail = (JSON.parse(JSON.stringify(this.shared.orderDetails)));
    this.products = (JSON.parse(JSON.stringify(this.shared.cartProducts)));

    this.calculateTotal();
    this.initializePaymentMethods();

  }
  openHomePage() {
    this.navCtrl.popToRoot();
  }

}

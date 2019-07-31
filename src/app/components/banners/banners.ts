import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPageModule } from '../../pages/products/products.module';
import { LoadingProvider } from '../../services/loading/loading';
import { ProductDetailPageModule } from '../../pages/product-detail/product-detail.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'banners',
  templateUrl: 'banners.html'
})
export class BannersComponent {

  constructor(
    private router: Router,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public loading: LoadingProvider,
  ) {

  }
  //===============================================================================================
  //on click image banners
  bannerClick = function (image) {
    //  console.log(image);
    if (image.type == 'category') {
      // this.navCtrl.push(ProductsPage, { id: parseInt(image.url) }); // TODO add image URL
      this.router.navigate(['/products']);
    }
    else if (image.type == 'product') {
      this.getSingleProductDetail(parseInt(image.url));
    }
    else {
      // this.navCtrl.push(ProductsPage, { sortOrder: image.type }); // TODO add image type
      this.router.navigate(['/products']);
    }
  }
  //===============================================================================================
  //getting single product data
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
        // this.navCtrl.push(ProductDetailPage, { data: data.product_data[0] }); // TODO add product data
        this.router.navigate(['/product-detail']);
      }
    });
  }

}

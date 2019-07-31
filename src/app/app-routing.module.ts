import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',  loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'billing-address', loadChildren: './pages/billing-address/billing-address.module#BillingAddressPageModule' },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'my-account', loadChildren: './pages/my-account/my-account.module#MyAccountPageModule' },
  { path: 'my-orders', loadChildren: './pages/my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'my-shipping-addresses', loadChildren: './pages/my-shipping-addresses/my-shipping-addresses.module#MyShippingAddressesPageModule' },
  { path: 'order', loadChildren: './pages/order/order.module#OrderPageModule' },
  { path: 'order-detail', loadChildren: './pages/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'product-detail', loadChildren: './pages/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'shipping-address', loadChildren: './pages/shipping-address/shipping-address.module#ShippingAddressPageModule' },
  { path: 'shipping-method', loadChildren: './pages/shipping-method/shipping-method.module#ShippingMethodPageModule' },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'stores', loadChildren: './pages/stores/stores.module#StoresPageModule' },
  { path: 'sub-categories', loadChildren: './pages/sub-categories/sub-categories.module#SubCategoriesPageModule' },
  { path: 'thank-you', loadChildren: './pages/thank-you/thank-you.module#ThankYouPageModule' },
  { path: 'wish-list', loadChildren: './pages/wish-list/wish-list.module#WishListPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'cart', loadChildren: './pages/cart/cart.module#CartPageModule' },
  { path: 'contact-us', loadChildren: './pages/contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'billing-address', loadChildren: './pages/billing-address/billing-address.module#BillingAddressPageModule' },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  { path: 'edit-shipping-address', loadChildren: './pages/edit-shipping-address/edit-shipping-address.module#EditShippingAddressPageModule' },
  { path: 'forgot-password', loadChildren: './pages/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'intro', loadChildren: './pages/intro/intro.module#IntroPageModule' },
  { path: 'language', loadChildren: './pages/language/language.module#LanguagePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'my-account', loadChildren: './pages/my-account/my-account.module#MyAccountPageModule' },
  { path: 'my-orders', loadChildren: './pages/my-orders/my-orders.module#MyOrdersPageModule' },
  { path: 'my-shipping-addresses', loadChildren: './pages/my-shipping-addresses/my-shipping-addresses.module#MyShippingAddressesPageModule' },
  { path: 'order', loadChildren: './pages/order/order.module#OrderPageModule' },
  { path: 'order-detail', loadChildren: './pages/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'privacy-policy', loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule' },
  { path: 'product-detail', loadChildren: './pages/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'products', loadChildren: './pages/products/products.module#ProductsPageModule' },
  { path: 'refund-policy', loadChildren: './pages/refund-policy/refund-policy.module#RefundPolicyPageModule' },
  { path: 'search', loadChildren: './pages/search/search.module#SearchPageModule' },
  { path: 'select-country', loadChildren: './pages/select-country/select-country.module#SelectCountryPageModule' },
  { path: 'select-zones', loadChildren: './pages/select-zones/select-zones.module#SelectZonesPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'shipping-address', loadChildren: './pages/shipping-address/shipping-address.module#ShippingAddressPageModule' },
  { path: 'shipping-method', loadChildren: './pages/shipping-method/shipping-method.module#ShippingMethodPageModule' },
  { path: 'shop', loadChildren: './pages/shop/shop.module#ShopPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'stores', loadChildren: './pages/stores/stores.module#StoresPageModule' },
  { path: 'sub-categories', loadChildren: './pages/sub-categories/sub-categories.module#SubCategoriesPageModule' },
  { path: 'term-services', loadChildren: './pages/term-services/term-services.module#TermServicesPageModule' },
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

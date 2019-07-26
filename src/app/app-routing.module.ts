import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'billing-address', loadChildren: './billing-address/billing-address.module#BillingAddressPageModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule' },
  { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'billing-address', loadChildren: './pages/billing-address/billing-address.module#BillingAddressPageModule' },
  { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesPageModule' },
  { path: 'edit-shipping-address', loadChildren: './pages/edit-shipping-address/edit-shipping-address.module#EditShippingAddressPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'language', loadChildren: './pages/language/language.module#LanguagePageModule' },
  { path: 'my-account', loadChildren: './pages/my-account/my-account.module#MyAccountPageModule' },
  { path: 'my-shipping-addresses', loadChildren: './pages/my-shipping-addresses/my-shipping-addresses.module#MyShippingAddressesPageModule' },
  { path: 'order-detail', loadChildren: './pages/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'product-detail', loadChildren: './pages/product-detail/product-detail.module#ProductDetailPageModule' },
  { path: 'refund-policy', loadChildren: './pages/refund-policy/refund-policy.module#RefundPolicyPageModule' },
  { path: 'select-country', loadChildren: './pages/select-country/select-country.module#SelectCountryPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'shipping-method', loadChildren: './pages/shipping-method/shipping-method.module#ShippingMethodPageModule' },
  { path: 'sign-up', loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'sub-categories', loadChildren: './pages/sub-categories/sub-categories.module#SubCategoriesPageModule' },
  { path: 'wish-list', loadChildren: './pages/wish-list/wish-list.module#WishListPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

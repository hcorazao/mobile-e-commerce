import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyShippingAddressesPage } from './my-shipping-addresses.page';

const routes: Routes = [
  {
    path: '',
    component: MyShippingAddressesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyShippingAddressesPage]
})
export class MyShippingAddressesPageModule {}

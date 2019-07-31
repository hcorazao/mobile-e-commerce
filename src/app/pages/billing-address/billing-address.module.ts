import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalsModule } from '../../modals/modals.module';

import { IonicModule } from '@ionic/angular';

import { BillingAddressPage } from './billing-address.page';

const routes: Routes = [
  {
    path: '',
    component: BillingAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BillingAddressPage]
})
export class BillingAddressPageModule {}

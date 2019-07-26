import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditShippingAddressPage } from './edit-shipping-address.page';

const routes: Routes = [
  {
    path: '',
    component: EditShippingAddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditShippingAddressPage]
})
export class EditShippingAddressPageModule {}

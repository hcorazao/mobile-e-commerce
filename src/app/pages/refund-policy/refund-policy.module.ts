import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RefundPolicyPage } from './refund-policy.page';

const routes: Routes = [
  {
    path: '',
    component: RefundPolicyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RefundPolicyPage]
})
export class RefundPolicyPageModule {}

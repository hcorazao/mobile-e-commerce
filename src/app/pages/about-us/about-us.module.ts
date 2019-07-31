import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ModalsModule } from '../../modals/modals.module';
import { ModalsModule } from '../../modals/modals.module';

import { IonicModule } from '@ionic/angular';

import { AboutUsPage } from './about-us.page';

const routes: Routes = [
  {
    path: '',
    component: AboutUsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AboutUsPage]
})
export class AboutUsPageModule {}


import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';


@Component({
  selector: 'app-privacy-policy',
  templateUrl: 'privacy-policy.page.html',
})
export class PrivacyPolicyModal {

  constructor(
    public viewCtrl: ViewController,

    public shared: SharedDataProvider,
     ) {
    this.shared.currentOpenedModel = this;
  }

  dismiss() {
    this.viewCtrl.dismiss();
    this.shared.currentOpenedModel = null;
  }


}

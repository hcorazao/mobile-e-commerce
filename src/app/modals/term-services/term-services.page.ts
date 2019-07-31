import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SharedDataProvider } from '../../services/shared-data/shared-data';


@Component({
  selector: 'app-term-services',
  templateUrl: 'term-services.page.html',
})
export class TermServicesModal {

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

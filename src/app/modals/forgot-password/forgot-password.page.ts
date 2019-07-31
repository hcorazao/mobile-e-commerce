import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingProvider } from '../../services/loading/loading';
import { ConfigProvider } from '../../services/config/config';
import { HttpClient } from '@angular/common/http';
import { SharedDataProvider } from '../../services/shared-data/shared-data';

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.page.html',
})
export class ForgotPasswordModal {
  formData = {
    email: '',
  };
  errorMessage = '';
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public loading: LoadingProvider,
    public httpClient: HttpClient,
    public shared: SharedDataProvider,
    public config: ConfigProvider,
    public navParams: NavParams) {
  }
  forgetPassword() {
    this.loading.show();
    this.errorMessage = '';
    this.httpClient.post(this.config.url + 'processforgotpassword', this.formData).subscribe((data: any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.shared.toast(data.message);
        this.dismiss();
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
        this.shared.toast(data.message);
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

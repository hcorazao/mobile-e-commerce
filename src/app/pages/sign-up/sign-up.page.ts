import { Component } from '@angular/core';
import { ViewController, ModalController } from 'ionic-angular';
import { LoadingProvider } from '../../services/loading/loading';
import { ConfigProvider } from '../../services/config/config';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';
import { LoginPageModule } from '../login/login.module';
import { HttpClient } from '@angular/common/http';
import { PrivacyPolicyPageModule } from '../privacy-policy/privacy-policy.module';
import { TermServicesPageModule } from '../term-services/term-services.module';
import { RefundPolicyPageModule } from '../refund-policy/refund-policy.module';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  formData = {
    customers_firstname: '',
    customers_lastname: '',
    email: '',
    password: '',
    customers_telephone: '',
    customers_picture: ''
  };
  image;
  errorMessage = '';
  constructor(
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
    public platform: Platform,
    private camera: Camera
  ) {
    this.shared.currentOpenedModel = this;
  }
  openCamera() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    this.platform.ready().then(() => {

      this.camera.getPicture(options).then((imageData) => {

        this.image = 'data:image/jpeg;base64,' + imageData;

      }, (err) => { });
    });
  }
  signUp() {
    this.loading.show();
    this.errorMessage = '';
    this.formData.customers_picture = this.image;
    this.httpClient.post(this.config.url + 'processregistration', this.formData).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.shared.login(data.data[0]);
        this.viewCtrl.dismiss();
      }
      if (data.success == 0) {
        this.errorMessage = data.message;
      }
    });
  }

  openPrivacyPolicyPage() {
    let modal = this.modalCtrl.create(PrivacyPolicyPage);
    modal.present();
  }
  openTermServicesPage() {
    let modal = this.modalCtrl.create(TermServicesPage);
    modal.present();
  }
  openRefundPolicyPage() {
    let modal = this.modalCtrl.create(RefundPolicyPage);
    modal.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
    this.shared.currentOpenedModel = null;
    let modal = this.modalCtrl.create(LoginPage);
    modal.present();
  }
}

import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { ConfigProvider } from '../../services/config/config';
import { Platform, NavController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertProvider } from '../../services/alert/alert';
import { LoadingProvider } from '../../services/loading/loading';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  myAccountData = {
    customers_firstname: '',
    customers_lastname: '',
    customers_telephone: '',
    currentPassword: '',
    password: '',
    customers_dob: '',
    customers_old_picture: ''
  };
  profilePicture = '';
  passwordData: { [k: string]: any } = {};
  placeholder: string = 'assets/placeholder.png';
  constructor(
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: SharedDataProvider,
    public translate: TranslateService,
    public platform: Platform,
    private camera: Camera,
    public navCtrl: NavController,
    public alert: AlertProvider,
    public actionSheetCtrl: ActionSheetController,
    public loading: LoadingProvider) {
  }

  // ============================================================================================
  // function updating user information
  updateInfo = function () {
    let currenrtPassword = this.myAccountData.currentPassword;
    let newPassword = this.myAccountData.password;
    this.loading.show();
    this.myAccountData.customers_id = this.shared.customerData.customers_id;

    if (this.profilePicture == this.config.imgUrl + this.shared.customerData.customers_picture) { //console.log("old picture");
      // this.myAccountData.customers_picture=$rootScope.customerData.customers_picture;
      this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
    }
    else if (this.profilePicture == '')
      this.myAccountData.customers_picture = null;
    else
      this.myAccountData.customers_picture = this.profilePicture;

    var dat = this.myAccountData;
    this.httpClient.post(this.config.url + 'updatecustomerinfo', dat).subscribe((data: any) => {

      this.loading.hide();
      if (data.success == 1) {
        //   document.getElementById("updateForm").reset();
        this.shared.toast(data.message);
        this.shared.customerData.customers_firstname = this.myAccountData.customers_firstname;
        this.shared.customerData.customers_lastname = this.myAccountData.customers_lastname;
        this.shared.customerData.customers_telephone = this.myAccountData.customers_telephone;
        this.shared.customerData.customers_picture = data.data[0].customers_picture;

        this.shared.customerData.customers_dob = this.myAccountData.customers_dob;
        if (this.myAccountData.password != '')
          this.shared.customerData.password = this.myAccountData.password;

        this.shared.login(this.shared.customerData);

        this.myAccountData.currentPassword = "";
        this.myAccountData.password = "";
      }
      else {
        this.translate.get(data.message).subscribe((res) => {
          this.shared.toast(res);
        });
      }
    }
      , error => {
        this.loading.hide();
        this.shared.toast("Error while Updating!");
      });
    //}
  }
  openActionSheet() {
    this.translate.get(["Camera", "Gallery", "Cancel", "Choose"]).subscribe((res) => {
      const actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: res["Camera"],
            icon: 'camera',
            handler: () => {
              this.openCamera("camera");
              console.log('Destructive clicked');
            }
          }, {
            text: res["Gallery"],
            icon: 'image',
            handler: () => {
              this.openCamera("gallery");
              console.log('Archive clicked');
            }
          }, {
            text: res["Cancel"],
            icon: 'close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    });
  }
  openCamera(type) {
    this.loading.autoHide(1000);

    let source = this.camera.PictureSourceType.CAMERA;
    if (type == 'gallery')
      source = this.camera.PictureSourceType.PHOTOLIBRARY;

    const options: CameraOptions = {
      quality: 80,
      sourceType: source,
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
        this.profilePicture = 'data:image/jpeg;base64,' + imageData;
      }, (err) => { });
    });
  }
  removeImage() {
    this.profilePicture = this.placeholder;
  }


  ionViewWillEnter() {
    this.myAccountData.customers_firstname = this.shared.customerData.customers_firstname;
    this.myAccountData.customers_lastname = this.shared.customerData.customers_lastname;

    this.profilePicture = this.config.imgUrl + this.shared.customerData.customers_picture;
    this.myAccountData.customers_old_picture = this.shared.customerData.customers_picture;
    this.myAccountData.customers_telephone = this.shared.customerData.customers_telephone;
    try {
      this.myAccountData.customers_dob = new Date(this.shared.customerData.customers_dob).toISOString();
    } catch (error) {
    }

  }
}

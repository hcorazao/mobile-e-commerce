import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from '../../services/config/config';
import { LoadingProvider } from '../../services/loading/loading';
import { SharedDataProvider } from '../../services/shared-data/shared-data';
import { AlertProvider } from '../../services/alert/alert';
import { CartPageModule } from '../cart/cart.module';
import { SearchPageModule } from '../search/search.module';
import { HttpClient } from '@angular/common/http';

declare var google;

@Component({
  selector: 'app-contact-us',
  templateUrl: 'contact-us.page.html',
})
export class ContactUsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  contact = {
    name: '',
    email: '',
    message: ''
  };
  constructor( private router: Router,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public loading: LoadingProvider,
    public shared: SharedDataProvider,
    public navCtrl: NavController,
    public alert: AlertProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }
  submit() {

    this.loading.show();
    var dat = {};
    dat = this.contact;
    this.httpClient.post(this.config.url + 'contactus', dat).subscribe((data:any) => {
      this.loading.hide();
      if (data.success == 1) {
        this.contact.name = '';
        this.contact.email = '';
        this.contact.message = '';
        this.shared.toast(data.message);
      }
    }, function (response) {
      this.loading.hide();
      this.shared.toast("Error server not reponding");
    });


  };
  loadMap() {

    let latLng = new google.maps.LatLng(this.config.latitude, this.config.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = this.config.address;

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }

  openCart() {
    this.router.navigate(['/cart']);
}
openSearch() {
    this.router.navigate(['/search']);
}

}

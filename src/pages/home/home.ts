import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public base64Image: string;

  constructor(public navCtrl: NavController, private camera: Camera) {

  }

  takePicture() {
    this.camera.getPicture({
      quality: 100,
      saveToPhotoAlbum: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      correctOrientation: false
    })
      .then((result) => {
        this.base64Image = result;
        console.log('Image URI: ' + this.base64Image);
      }, (error) => {
        console.log("ERROR -> " + JSON.stringify(error));
      });
  }

  takePictureFromGallery() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 2000,
      targetHeight: 2000,
      quality: 100,
      allowEdit: true,
      correctOrientation: false,
      saveToPhotoAlbum: true,
      mediaType: 0,
      sourceType: 0
    }).then((imageData) => {
      let cameraImageSelector = document.getElementById('camera-image');
      let image = "data:image/jpeg;base64," + imageData;
      cameraImageSelector.setAttribute('src', image);
    }, (err) => {
      console.log(err);
    });
  }

}

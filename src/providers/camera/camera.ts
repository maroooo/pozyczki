import { Injectable } from '@angular/core';
import { Camera, CameraOptions  } from '@ionic-native/camera'

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(private camera: Camera) {
    console.log('Hello CameraProvider Provider');
  }

  defaultImage = 'data:image/png;base64,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';
  image: string;

  pictureOptions: CameraOptions = {
      quality: 100,
      targetWidth: 900,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: true,
      sourceType: 1
  }

  takePicture(){
    this.camera.getPicture(this.pictureOptions).then((imageData) => {
        this.image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  galleryOptions: CameraOptions = {
      quality: 100,
      targetWidth: 900,
      targetHeight: 600,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
  }
  
  openGallery() {
    this.camera.getPicture(this.galleryOptions).then((imageData) => {
        this.image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// Model przedmiotu
import { Item } from '../../models/item/item';
// Biblioteka odpowiedzialna za stworzenie i walidacje formularza nowo tworzonego przedmiotu
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
// Providery
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ItemsProvider } from '../../providers/items/items';
import { CameraProvider  } from '../../providers/camera/camera';
/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {

	addItemForm: FormGroup;

  constructor(public navCtrl: NavController,
  						public loadingCtrl: LoadingController, 
  						public navParams: NavParams,
  						private formBuilder: FormBuilder,
  						public itemsProvider: ItemsProvider,
  						private userProvider: AuthenticationProvider,
              public camera: CameraProvider
              ) {
  	this.addItemForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      person: '',
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      comment: ''
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  item: Item = {
    id: '',
    uid: '',
    name: '',
    state: '',
    category: '',
    person: '',
    startDate: '',
    endDate: '',
    comment: '',
    image: ''
  }

  contactsList = ['Adam Nowak', 'Maciek', 'Jan Kowalski', 'Adam Małysz', 'Monika Bąk', 'Kapitan', 'Mama', 'Najlepszy Brat', 'Obywatel GC'];
  categories = ['pieniądze', 'książka', 'narzędzia', 'urządzenia', 'samochód'];
  states = ['wypożyczam', 'pożyczam'];
  defaultImg = this.camera.defaultImage;

  async addItem() {
  	const loading = await this.loadingCtrl.create();
    const userId = this.userProvider.getUserId();
    const name = this.addItemForm.value.name;
    const state = this.addItemForm.value.state;
    const category = this.addItemForm.value.category;
    const person = this.addItemForm.value.person;
    const startDate = this.addItemForm.value.startDate;
    const endDate = this.addItemForm.value.endDate;
    const comment = this.addItemForm.value.comment;
    const image = this.defaultImg;
    this.itemsProvider
      .createItem(name, userId, state, category, person, startDate, endDate, comment, image)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.navCtrl.popToRoot();
          });
        },
        error => {
          console.error(error);
        }
      );

    return await this.navCtrl.popToRoot();

  }

  takePicture() {
    this.camera.takePicture();
    this.defaultImg = this.camera.image;
  }

  getPicture() {
    this.camera.openGallery();
    this.defaultImg = this.camera.image;
  }
}
